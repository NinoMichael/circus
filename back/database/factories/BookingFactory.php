<?php

namespace Database\Factories;

use App\Models\BookingPassenger;
use App\Models\BookingSeat;
use App\Models\BusSeat;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $trip = Trip::factory()->create();

        $nbBookers = rand(1,4);

        return [
            'user_id' => User::factory()->state([
                'role' => 'passenger'
            ]),
            'trip_id' => $trip->id,
            'nb_bookers' => $nbBookers,
            'total_amount' => $trip->fees * $nbBookers,
            'is_missing' => fake()->boolean(10),
            'status' => fake()->randomElement([
                'pending',
                'confirmed',
                'paid',
                'cancelled',
                'refunded',
                'archived'
            ]),
        ];
    }

    /**
     * Associate bus seats & passengers to booking.
     */
    public function configure()
    {
        return $this->afterCreating(function ($booking) {

            $trip = Trip::find($booking->trip_id);

            if (!$trip || !$trip->bus_id) {
                return;
            }

            $seats = BusSeat::where('bus_id', $trip->bus_id)
                ->inRandomOrder()
                ->take($booking->nb_bookers)
                ->get();

            foreach ($seats as $seat) {

                BookingSeat::create([
                    'booking_id' => $booking->id,
                    'seat_id' => $seat->id
                ]);

                BookingPassenger::create([
                    'booking_id' => $booking->id,
                    'passenger_name' => fake()->name(),
                    'passenger_phone_number' => fake()->phoneNumber()
                ]);

            }

        });
    }
}
