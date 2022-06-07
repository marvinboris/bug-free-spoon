<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Elder;
use App\Models\School;
use App\Notifications\ApplicationApproved;
use App\Notifications\ApplicationRejected;
use Illuminate\Http\Request;

class ElderController extends Controller
{
    private $rules = [
        'school_id' => 'nullable|exists:schools,id',
        'name' => 'required|string',
        'email' => 'required|email',
        'title' => 'array|required',
        'promotion' => 'nullable|integer',
        'photo' => 'nullable|image',
        'payment' => 'nullable|image',
        'paid' => 'required|integer',
        'errors' => 'nullable|string',
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
            ->join('schools', 'schools.id', '=', 'elders.school_id')
            ->select('elders.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('elders.title', 'LIKE', "%$search%")
                        ->orWhere('schools.name', 'LIKE', "%$search%")
                        ->orWhere('schools.abbr', 'LIKE', "%$search%")
                        ->orWhere('elders.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $elder) {
            $elders[] = array_merge($elder->toArray(), [
                'school' => $elder->school ? $elder->school->name : null
            ]);
        }

        return [
            'elders' => $elders,
            'total' => $total,
        ];
    }

    private function information()
    {
        $schools = School::all();

        return [
            'schools' => $schools,
        ];
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

        $input = $request->except(['photo', 'payment', 'title']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'elders');
            $input['photo'] = htmlspecialchars($fileName);
        }

        if ($file = $request->file('payment')) {
            $fileName = UtilController::resize($file, 'elders');
            $input['payment'] = htmlspecialchars($fileName);
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

        $input = $request->except(['photo', 'payment', 'title', 'errors']);

        if ($file = $request->file('photo')) {
            if ($elder->photo && is_file(public_path($elder->photo))) unlink(public_path($elder->photo));
            $fileName = UtilController::resize($file, 'elders');
            $input['photo'] = htmlspecialchars($fileName);
        }

        if ($file = $request->file('payment')) {
            if ($elder->payment && is_file(public_path($elder->payment))) unlink(public_path($elder->payment));
            $fileName = UtilController::resize($file, 'elders');
            $input['payment'] = htmlspecialchars($fileName);
        }

        if ($request->paid == 0) {
            $input['errors'] = $request->errors;
            $elder->notify(new ApplicationRejected($request->errors));

            if ($elder->photo && is_file(public_path($elder->photo))) unlink(public_path($elder->photo));
            if ($elder->payment && is_file(public_path($elder->payment))) unlink(public_path($elder->payment));
            $elder->delete();

            return response()->json([
                'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['application'], 'success'),
            ]);
        } else {
            if ($elder->paid == 0) $elder->notify(new ApplicationApproved());
            $elder->update($input + [
                'title' => json_encode($request->title),
            ]);

            return response()->json([
                'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['elders']['updated'], 'success'),
                'elder' => $elder,
            ]);
        }
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
        if ($elder->payment && is_file(public_path($elder->payment))) unlink(public_path($elder->payment));
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
