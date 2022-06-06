<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Contribution;
use App\Models\Elder;
use App\Models\Event;
use App\Models\Language;
use App\Models\Publication;
use App\Models\Restaurant;
use App\Models\Subscriber;
use App\Models\User;
use App\Notifications\ContactNotification;
use App\Notifications\NewContribution;
use App\Notifications\NewMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class FrontendController extends Controller
{
    public function home()
    {
        $events = Event::orderBy('id', 'DESC')->get();
        $activities = Activity::orderBy('id', 'DESC')->take(3)->get();
        $stats = [
            [
                'key' => 'members',
                'value' => Elder::wherePaid(1)->count(),
            ],
            [
                'key' => 'photos',
                'value' => Elder::wherePaid(1)->count() + Activity::count() + Event::count() + Publication::count(),
            ],
            [
                'key' => 'events',
                'value' => Event::count(),
            ],
            [
                'key' => 'awards',
                'value' => '30+',
            ]
        ];
        $elders = Elder::wherePaid(1)->orderBy('id', 'DESC')->take(3)->get();
        $publications = Publication::orderBy('id', 'DESC')->take(3)->get();

        return response()->json([
            'events' => $events,
            'activities' => $activities,
            'stats' => $stats,
            'elders' => $elders,
            'publications' => $publications,
        ]);
    }

    public function newsletter(Request $request)
    {
        $input = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:subscribers'
        ]);

        Subscriber::create($input);

        return response()->json([
            'message' => UtilController::message('Souscription réussie.', 'success'),
        ]);
    }

    public function join(Request $request)
    {
        $request->validate([
            'title' => 'required|array',
            'name' => 'required|unique:elders',
            'email' => 'required|unique:elders',
            'photo' => 'required|image',
            'payment' => 'required|image',
        ]);

        $input = $request->except(['photo', 'payment', 'title']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'elders');
            $input['photo'] = htmlspecialchars($fileName);
        }

        if ($file = $request->file('payment')) {
            $fileName = UtilController::resize($file, 'elders');
            $input['payment'] = htmlspecialchars($fileName);
        }

        $elder = Elder::create($input + [
            'paid' => 0,
        ]);

        Notification::send(User::all(), new NewMember($elder));

        return response()->json([
            'message' => UtilController::message('Souscription réussie.', 'success'),
        ]);
    }

    public function pay(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:elders',
            'year' => 'required|integer',
            'payment' => 'required|image',
        ]);

        $input = $request->except(['payment', 'email']);

        $input['elder_id'] = Elder::whereEmail($request->email)->first()->id;

        if ($file = $request->file('payment')) {
            $fileName = UtilController::resize($file, 'elders');
            $input['payment'] = htmlspecialchars($fileName);
        }

        $contribution = Contribution::create($input + [
            'paid' => 0,
        ]);

        Notification::send(User::all(), new NewContribution($contribution));

        return response()->json([
            'message' => UtilController::message('Souscription réussie.', 'success'),
        ]);
    }

    public function alumni_call()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $total = 0;

        $elders = [];
        $filteredData = Elder::wherePaid(1)->orderBy('id');

        $filteredData = $filteredData
            ->select('elders.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('elders.title', 'LIKE', "%$search%")
                        ->orWhere('elders.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $elder) {
            $elders[] = array_merge($elder->toArray(), []);
        }

        return response()->json([
            'elders' => $elders,
            'total' => $total,
        ]);
    }

    public function committee()
    {
        return response()->json([]);
    }

    public function opportunities()
    {
        return response()->json([]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Notification::send(User::all(), new ContactNotification($request->all()));

        return response()->json([
            'message' => UtilController::message('Formulaire soumis.', 'success'),
        ]);
    }

    public function publications()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $publications = [];
        $filteredData = Publication::orderBy('id');

        $filteredData = $filteredData
            ->join('users', function ($join) {
                $join->on('users.id', 'publications.author_id');
                $join->where('publications.author_type', '=', User::class);
            })
            // ->join('admins', function ($join) {
            //     $join->on('admins.id', 'publications.author_id');
            //     $join->where('publications.author_type', '=', Admin::class);
            // })
            ->select('publications.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('publications.title', 'LIKE', "%$search%")
                        ->orWhere('publications.body', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('publications.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'author' => $publication->author->name,
            ]);
        }

        return response()->json([
            'publications' => $publications,
        ]);
    }

    public function publication($slug)
    {
        $publication = Publication::whereSlug($slug)->first();

        if (!$publication) return response()->json([
            'message' => UtilController::message('Publication introuvable.', 'danger'),
        ]);

        return response()->json([
            'publication' => $publication,
        ]);
    }

    public function activities()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $activities = [];
        $filteredData = Activity::orderBy('id');

        $filteredData = $filteredData
            ->select('activities.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('activities.title', 'LIKE', "%$search%")
                        ->orWhere('activities.body', 'LIKE', "%$search%")
                        ->orWhere('activities.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $activity) {
            $activities[] = array_merge($activity->toArray(), []);
        }

        return response()->json([
            'activities' => $activities,
        ]);
    }

    public function activity($slug)
    {
        $activity = Activity::whereSlug($slug)->first();

        if (!$activity) return response()->json([
            'message' => UtilController::message('Activité introuvable.', 'danger'),
        ]);

        return response()->json([
            'activity' => $activity,
        ]);
    }

    public function events()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $events = [];
        $filteredData = Event::orderBy('id');

        $filteredData = $filteredData
            ->select('events.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('events.title', 'LIKE', "%$search%")
                        ->orWhere('events.description', 'LIKE', "%$search%")
                        ->orWhere('events.body', 'LIKE', "%$search%")
                        ->orWhere('events.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $event) {
            $events[] = array_merge($event->toArray(), []);
        }

        return response()->json([
            'events' => $events,
        ]);
    }

    public function event($slug)
    {
        $event = Event::whereSlug($slug)->first();

        if (!$event) return response()->json([
            'message' => UtilController::message('Evènement introuvable.', 'danger'),
        ]);

        return response()->json([
            'event' => $event,
        ]);
    }
}
