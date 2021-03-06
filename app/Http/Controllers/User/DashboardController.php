<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Activity;
use App\Models\Elder;
use App\Models\Event;
use App\Models\Form;
use App\Models\Publication;
use App\Models\Subscriber;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $events = Event::count();
        $activities = Activity::count();
        $elders = Elder::count();
        $publications = Publication::count();
        $subscribers = Subscriber::count();

        $generalReport = [
            'elders' => Elder::count(),
            'publications' => Publication::count(),
        ];

        $names = $cms['pages'][$user->language->abbr]['general']['months'];
        $totalElders = [];
        $totalPublications = [];
        for ($i=0; $i < 12; $i++) {
            $totalElders[] = Elder::whereYear('created_at', now()->year)->whereMonth('created_at', $i + 1)->count(); 
            $totalPublications[] = Publication::whereYear('created_at', now()->year)->whereMonth('created_at', $i + 1)->count(); 
        }

        for ($i = 0; $i < count($names); $i++) {
            $generalReportTrackerData[] = [
                'name' => strtoupper($names[$i]),
                'Anciens' => $totalElders[$i],
                'Publications' => $totalPublications[$i],
            ];
        }

        return response()->json([
            'blocksData' => [
                'events' => $events,
                'activities' => $activities,
                'elders' => $elders,
                'publications' => $publications,
                'subscribers' => $subscribers,
            ],
            'generalReport' => $generalReport,
            'generalReportTrackerData' => $generalReportTrackerData,
        ]);
    }
}
