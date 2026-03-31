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

    /**
     * Get all public trips with optional filters
     */
    public function publicIndex(Request $request): JsonResponse
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 10);
        $type = $request->query('type', 'upcoming');
        $sortBy = $request->query('sort_by', 'earliest');

        $query = Trip::with([
            'route.departureStation',
            'route.arrivalStation',
            'buse',
            'cooperative'
        ]);

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
     * Search public trips with filters
     */
    public function publicSearch(Request $request): JsonResponse
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 10);
        $departure = $request->query('departure');
        $arrival = $request->query('arrival');
        $date = $request->query('date');
        $minPrice = $request->query('min_price');
        $maxPrice = $request->query('max_price');
        $departureTime = $request->query('departure_time'); // morning, afternoon, evening
        $cooperatives = $request->query('cooperatives');
        $busTypes = $request->query('bus_types');
        $sortBy = $request->query('sort_by', 'earliest');

        $query = Trip::with([
            'route.departureStation',
            'route.arrivalStation',
            'buse',
            'cooperative'
        ]);

        $now = now();
        $query->where('departure_time', '>=', $now)
              ->whereIn('status', ['scheduled', 'active']);

        if ($departure) {
            $query->whereHas('route.departureStation', function ($q) use ($departure) {
                $q->where('city', 'like', "%{$departure}%")
                  ->orWhere('name', 'like', "%{$departure}%");
            });
        }

        if ($arrival) {
            $query->whereHas('route.arrivalStation', function ($q) use ($arrival) {
                $q->where('city', 'like', "%{$arrival}%")
                  ->orWhere('name', 'like', "%{$arrival}%");
            });
        }

        if ($date) {
            $query->whereDate('departure_time', $date);
        }

        if ($minPrice) {
            $query->whereRaw('CAST(fees AS DECIMAL) >= ?', [(float)$minPrice]);
        }

        if ($maxPrice) {
            $query->whereRaw('CAST(fees AS DECIMAL) <= ?', [(float)$maxPrice]);
        }

        if ($departureTime) {
            switch ($departureTime) {
                case 'morning':
                    $query->whereTime('departure_time', '>=', '00:00:00')
                          ->whereTime('departure_time', '<=', '11:59:59');
                    break;
                case 'afternoon':
                    $query->whereTime('departure_time', '>=', '12:00:00')
                          ->whereTime('departure_time', '<=', '17:59:59');
                    break;
                case 'evening':
                    $query->whereTime('departure_time', '>=', '18:00:00')
                          ->whereTime('departure_time', '<=', '23:59:59');
                    break;
            }
        }

        if ($cooperatives) {
            $coopIds = explode(',', $cooperatives);
            $query->whereIn('cooperative_id', $coopIds);
        }

        if ($busTypes) {
            $query->whereHas('buse', function ($q) use ($busTypes) {
                $types = explode(',', $busTypes);
                $q->whereIn('type', $types);
            });
        }

        if ($sortBy === 'earliest') {
            $query->orderBy('departure_time', 'asc');
        } elseif ($sortBy === 'latest') {
            $query->orderBy('departure_time', 'desc');
        } elseif ($sortBy === 'price_low') {
            $query->orderByRaw('CAST(fees AS DECIMAL) ASC');
        } elseif ($sortBy === 'price_high') {
            $query->orderByRaw('CAST(fees AS DECIMAL) DESC');
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