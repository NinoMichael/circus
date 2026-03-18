<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\Cooperative;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Fetch KPIs for about page
     * 
     * @return JsonResponse
     */
    public function getKpisAbout(): JsonResponse
    {
        $cityCount = Station::distinct('city')->count('city');
        $cooperativeCount = Cooperative::count();
        $cooperatives = Cooperative::select('name', 'logo')
            ->take(4)
            ->get();

        return response()->json([
            "city_count" => $cityCount,
            "cooperative_count" => $cooperativeCount,
            "cooperatives" => $cooperatives,
        ]);
    }
}
