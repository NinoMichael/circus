<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\JsonResponse;

class StationController extends Controller
{
    /**
     * Get all stations
     */
    public function index(): JsonResponse
    {
        $stations = Station::orderBy('city')->orderBy('name')->get();

        return response()->json([
            'stations' => $stations,
        ]);
    }

    /**
     * Get stations by city
     */
    public function byCity(): JsonResponse
    {
        $stations = Station::select('city')
            ->distinct()
            ->orderBy('city')
            ->pluck('city');

        return response()->json([
            'cities' => $stations,
        ]);
    }
}