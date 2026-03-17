<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\Cooperative;

class DashboardController extends Controller
{
    public function countUniqueCities()
    {
        $count = Station::distinct('city')->count('city');

        return $count;
    }

    public function countCooperatives()
    {
        $count = Cooperative::count();

        return $count;
    }

    public function getFiveCooperatives()
    {
        $cooperatives = Cooperative::select('name', 'logo')
            ->take(5)
            ->get();

        return response()->json($cooperatives);
    }
}
