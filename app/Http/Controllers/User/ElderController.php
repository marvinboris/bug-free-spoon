<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Elder;
use Illuminate\Http\Request;

class ElderController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'title' => 'array|required',
        'photo' => 'nullable|image',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $elders = [];
        $filteredData = Elder::orderBy('id');

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

        return [
            'elders' => $elders,
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

        $elders = $data['elders'];
        $total = $data['total'];

        return response()->json([
            'elders' => $elders,
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

        $elder = Elder::find($id);
        if (!$elder) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'elder' => $elder,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'title']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'elders');
            $input['photo'] = htmlspecialchars($fileName);
        }

        Elder::create($input + [
            'title' => json_encode($request->title),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $elder = Elder::find($id);
        if (!$elder) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'title']);

        if ($file = $request->file('photo')) {
            if ($elder->photo && is_file(public_path($elder->photo))) unlink(public_path($elder->photo));
            $fileName = UtilController::resize($file, 'elders');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $elder->update($input + [
            'title' => json_encode($request->title),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['updated'], 'success'),
            'elder' => $elder,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $elder = Elder::find($id);
        if (!$elder) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['not_found'], 'danger'),
        ]);

        if ($elder->photo && is_file(public_path($elder->photo))) unlink(public_path($elder->photo));
        $elder->delete();

        $data = $this->data();

        $elders = $data['elders'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['deleted'], 'success'),
            'elders' => $elders,
            'total' => $total,
        ]);
    }
}
