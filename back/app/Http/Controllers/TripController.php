<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Trip;
use App\Models\BusSeat;
use App\Models\Booking;
use App\Models\BookingSeat;
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

    /**
     * Get a specific trip detail
     */
    public function show(Driver $driver, Trip $trip): JsonResponse
    {
        $trip->load([
            'route.departureStation',
            'route.arrivalStation',
            'buse',
            'cooperative',
            'bookings.user',
            'bookings.bookingSeats.busSeat'
        ]);

        if ($trip->buse->driver_id !== $driver->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($trip);
    }

    /**
     * Get boarding data for a specific trip
     */
    public function boarding(Driver $driver, Trip $trip): JsonResponse
    {
        if ($trip->buse->driver_id !== $driver->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $trip->load([
            'route.departureStation',
            'route.arrivalStation',
            'buse.cooperative',
            'bookings.user',
            'bookings.bookingSeats.busSeat'
        ]);

        $busSeats = BusSeat::where('bus_id', $trip->bus_id)
            ->orderBy('seat_number')
            ->get()
            ->map(function ($seat) use ($trip) {
                $bookingSeat = BookingSeat::whereHas('booking', function ($q) use ($trip) {
                    $q->where('trip_id', $trip->id);
                })->where('seat_id', $seat->id)->first();

                return [
                    'id' => $seat->id,
                    'seat_number' => $seat->seat_number,
                    'seat_type' => $seat->seat_type,
                    'is_available' => $seat->is_available,
                    'booking_id' => $bookingSeat?->booking_id,
                    'is_booked' => $bookingSeat !== null,
                    'booking_status' => $bookingSeat?->booking?->status,
                    'passenger_name' => $bookingSeat?->booking?->user?->fullname ?? 
                                       $bookingSeat?->booking?->bookingPassengers?->first()?->name,
                ];
            });

        $confirmedBookings = $trip->bookings->filter(function ($booking) {
            return $booking->status === 'confirmed';
        });

        $totalCapacity = $trip->buse->capacity;
        $bookedSeats = $confirmedBookings->sum(function ($booking) {
            return $booking->bookingSeats->count();
        });

        return response()->json([
            'trip' => $trip,
            'bus' => $trip->buse,
            'cooperative' => $trip->cooperative,
            'progress' => [
                'booked_seats' => $bookedSeats,
                'total_capacity' => $totalCapacity,
                'percentage' => $totalCapacity > 0 ? round(($bookedSeats / $totalCapacity) * 100) : 0,
                'remaining' => $totalCapacity - $bookedSeats,
            ],
            'seats' => $busSeats,
            'bookings' => $confirmedBookings->values(),
        ]);
    }

    /**
     * Start a trip (change status to active)
     */
    public function start(Trip $trip): JsonResponse
    {
        $trip->status = 'active';
        $trip->save();

        return response()->json([
            'message' => 'Trajet démarré avec succès',
            'trip' => $trip
        ]);
    }
}