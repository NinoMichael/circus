<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\BookingPassenger;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingPassenger>
 */
class BookingPassengerFactory extends Factory
{
    protected $model = BookingPassenger::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'passenger_name' => fake()->name(),
            'passenger_phone_number' => fake()->phoneNumber(),
        ];
    }
}
