<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\School;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'abbr' => 'required|string',
        'link' => 'nullable|string',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $schools = [];
        $filteredData = School::orderBy('id');

        $filteredData = $filteredData
            ->select('schools.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('schools.abbr', 'LIKE', "%$search%")
                        ->orWhere('schools.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $school) {
            $schools[] = array_merge($school->toArray(), []);
        }

        return [
            'schools' => $schools,
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

        $schools = $data['schools'];
        $total = $data['total'];

        return response()->json([
            'schools' => $schools,
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

        $school = School::find($id);
        if (!$school) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['schools']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'school' => $school,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        School::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['schools']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $school = School::find($id);
        if (!$school) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['schools']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->all();

        $school->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['schools']['updated'], 'success'),
            'school' => $school,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $school = School::find($id);
        if (!$school) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['schools']['not_found'], 'danger'),
        ]);

        $school->delete();

        $data = $this->data();

        $schools = $data['schools'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['schools']['deleted'], 'success'),
            'schools' => $schools,
            'total' => $total,
        ]);
    }
}
