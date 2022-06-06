<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Contribution;
use App\Models\Elder;
use Illuminate\Http\Request;

class ContributionController extends Controller
{
    private $rules = [
        'elder_id' => 'required|exists:elders,id',
        'payment' => 'nullable|image',
        'year' => 'required|integer',
        'paid' => 'required|integer'
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $contributions = [];
        $filteredData = Contribution::orderBy('id');

        $filteredData = $filteredData
            ->join('elders', 'elders.id', '=', 'contributions.elder_id')
            ->select('contributions.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('contributions.year', 'LIKE', "%$search%")
                        ->orWhere('elders.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $contribution) {
            $contributions[] = array_merge($contribution->toArray(), [
                'elder' => $contribution->elder->name,
            ]);
        }

        return [
            'contributions' => $contributions,
            'total' => $total,
        ];
    }

    private function information()
    {
        $elders = Elder::all();

        return [
            'elders' => $elders,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $contributions = $data['contributions'];
        $total = $data['total'];

        return response()->json([
            'contributions' => $contributions,
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

        $contribution = Contribution::find($id);
        if (!$contribution) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['contributions']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'contribution' => $contribution,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        Contribution::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['contributions']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $contribution = Contribution::find($id);
        if (!$contribution) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['contributions']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->all();

        $contribution->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['contributions']['updated'], 'success'),
            'contribution' => $contribution,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $contribution = Contribution::find($id);
        if (!$contribution) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['contributions']['not_found'], 'danger'),
        ]);

        $contribution->delete();

        $data = $this->data();

        $contributions = $data['contributions'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['contributions']['deleted'], 'success'),
            'contributions' => $contributions,
            'total' => $total,
        ]);
    }
}
