<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Trip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * Get trips for a specific driver with pagination and filters
     */
    public function indexByDriver(Request $request, Driver $driver): JsonResponse
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 10);
        $type = $request->query('type', 'upcoming');
        $sortBy = $request->query('sort_by', 'earliest');

        $query = Trip::with([
            'route.departureStation',
            'route.arrivalStation',
            'buse'
        ])
        ->whereHas('buse', function ($query) use ($driver) {
            $query->where('driver_id', $driver->id);
        });

        $now = now();

        switch ($type) {
            case 'upcoming':
                $query->where('departure_time', '>=', $now)
                      ->whereIn('status', ['scheduled', 'active']);
                break;
            case 'past':
                $query->where(function ($q) use ($now) {
                    $q->where('departure_time', '<', $now)
                      ->orWhereIn('status', ['completed']);
                });
                break;
            case 'cancelled':
                $query->where('status', 'cancelled');
                break;
        }

        if ($sortBy === 'earliest') {
            $query->orderBy('departure_time', 'asc');
        } else {
            $query->orderBy('departure_time', 'desc');
        }

        $trips = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'trips' => $trips->items(),
            'meta' => [
                'current_page' => $trips->currentPage(),
                'last_page' => $trips->lastPage(),
                'per_page' => $trips->perPage(),
                'total' => $trips->total()
            ]
        ]);
    }
}