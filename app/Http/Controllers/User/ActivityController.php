<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    private $rules = [
        'title' => 'array|required',
        'body' => 'array|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

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

        return [
            'activities' => $activities,
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

        $activities = $data['activities'];
        $total = $data['total'];

        return response()->json([
            'activities' => $activities,
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

        $activity = Activity::find($id);
        if (!$activity) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['activities']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'activity' => $activity,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'title', 'body']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'activities');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Activity::create($input + [
            'title' => json_encode($request->title),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['activities']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $activity = Activity::find($id);
        if (!$activity) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['activities']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'title', 'body']);

        if ($file = $request->file('photo')) {
            if ($activity->photo && is_file(public_path($activity->photo))) unlink(public_path($activity->photo));
            $fileName = UtilController::resize($file, 'activities');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $activity->update($input + [
            'title' => json_encode($request->title),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['activities']['updated'], 'success'),
            'activity' => $activity,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $activity = Activity::find($id);
        if (!$activity) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['activities']['not_found'], 'danger'),
        ]);

        if ($activity->photo && is_file(public_path($activity->photo))) unlink(public_path($activity->photo));
        $activity->delete();

        $data = $this->data();

        $activities = $data['activities'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['activities']['deleted'], 'success'),
            'activities' => $activities,
            'total' => $total,
        ]);
    }
}
