<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\BusSeat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingSeat>
 */
class BookingSeatFactory extends Factory
{
    protected $model = BookingSeat::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'seat_id' => BusSeat::factory(),
        ];
    }
}
