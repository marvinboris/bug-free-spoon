<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    private $rules = [
        'title' => 'array|required',
        'description' => 'array|required',
        'body' => 'array|required',
        'photo' => 'nullable|image',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

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

        return [
            'events' => $events,
            'total' => $total,
        ];
    }

    private function information()
    {
        return [];
    }



    public function index()
    {
        $data = $this->data();

        $events = $data['events'];
        $total = $data['total'];

        return response()->json([
            'events' => $events,
            'total' => $total,
        ]);
    }

    public function info()
    {
        $information = $this->information();

        return response()->json($information);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $event = Event::find($id);
        if (!$event) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['events']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'event' => $event,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'title', 'description', 'body']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'events');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Event::create($input + [
            'title' => json_encode($request->title),
            'description' => json_encode($request->description),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['events']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $event = Event::find($id);
        if (!$event) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['events']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'title', 'description', 'body']);

        if ($file = $request->file('photo')) {
            if ($event->photo && is_file(public_path($event->photo))) unlink(public_path($event->photo));
            $fileName = UtilController::resize($file, 'events');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $event->update($input + [
            'title' => json_encode($request->title),
            'description' => json_encode($request->description),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['events']['updated'], 'success'),
            'event' => $event,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $event = Event::find($id);
        if (!$event) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['events']['not_found'], 'danger'),
        ]);

        if ($event->photo && is_file(public_path($event->photo))) unlink(public_path($event->photo));
        $event->delete();

        $data = $this->data();

        $events = $data['events'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['events']['deleted'], 'success'),
            'events' => $events,
            'total' => $total,
        ]);
    }
}
