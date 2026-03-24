<?php

namespace App\Http\Controllers;

use App\Models\Buse;
use App\Models\Station;
use App\Models\Cooperative;
use App\Models\Driver;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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


    /**
     * Fetch KPIs for driver overview page
     * 
     * @return JsonResponse
     */
    public function getKpisDriver(Driver $driver): JsonResponse
    {
        $trips = Trip::whereHas('buse', function ($query) use ($driver) {
            $query->where('driver_id', $driver->id);
        })->count();

        $busCapacity = Buse::select('capacity')->where('driver_id', $driver->id)->get();

        $baseQuery = Trip::whereHas('buse', function ($query) use ($driver) {
            $query->where('driver_id', $driver->id);
        });
    
        $trips = $baseQuery->count();
    
        $nextTrip = (clone $baseQuery)
            ->with(['route.departureStation', 'route.arrivalStation'])
            ->where('departure_time', '>=', now())
            ->orderBy('departure_time', 'asc')
            ->first();

        return response()->json([
            "trips" => $trips,
            "bus" => $busCapacity,
            "next_trip" => $nextTrip
        ]);
    }
}
