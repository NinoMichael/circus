<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Get bookings for the authenticated user with optional filters
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $page = $request->query('page', 1);
            $perPage = $request->query('per_page', 10);
            $type = $request->query('type', 'all');

            $query = Booking::with([
                'trip.route.departureStation',
                'trip.route.arrivalStation',
                'trip.cooperative',
                'payment',
                'bookingSeats'
            ])
            ->where('user_id', $user->id)
            ->whereHas('trip');

            $now = now();

            switch ($type) {
                case 'upcoming':
                    $query->where('status', 'confirmed')
                          ->whereHas('trip', function ($q) use ($now) {
                              $q->where('departure_time', '>=', $now)
                                ->whereIn('status', ['scheduled', 'active']);
                          });
                    break;
                case 'past':
                    $query->where('status', 'confirmed')
                          ->whereHas('trip', function ($tripQ) use ($now) {
                              $tripQ->where(function ($tq) use ($now) {
                                  $tq->where('departure_time', '<', $now)
                                     ->orWhereIn('status', ['completed']);
                              });
                          });
                    break;
                case 'cancelled':
                    $query->where('status', 'cancelled');
                    break;
                case 'pending':
                    $query->where('status', 'pending');
                    break;
            }

            $bookings = $query->orderBy('created_at', 'desc')
                              ->paginate($perPage, ['*'], 'page', $page);

            return response()->json([
                'bookings' => $bookings->items(),
                'meta' => [
                    'current_page' => $bookings->currentPage(),
                    'last_page' => $bookings->lastPage(),
                    'per_page' => $bookings->perPage(),
                    'total' => $bookings->total()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des réservations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific booking detail
     */
    public function show(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();

        if ($booking->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->load([
            'trip.route.departureStation',
            'trip.route.arrivalStation',
            'trip.cooperative',
            'trip.buse',
            'payment',
            'bookingSeats.busSeat',
            'bookingPassengers'
        ]);

        return response()->json($booking);
    }

    /**
     * Cancel a booking
     */
    public function cancel(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();

        if ($booking->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return response()->json(['message' => 'Cannot cancel this booking'], 400);
        }

        $trip = $booking->trip;
        if ($trip && $trip->departure_time <= now()) {
            return response()->json(['message' => 'Cannot cancel past trips'], 400);
        }

        $booking->status = 'cancelled';
        $booking->save();

        $booking->load([
            'trip.route.departureStation',
            'trip.route.arrivalStation',
            'trip.cooperative',
            'payment',
            'bookingSeats'
        ]);

        return response()->json([
            'message' => 'Réservation annulée avec succès',
            'booking' => $booking
        ]);
    }
}
