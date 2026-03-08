<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\BookingCancelJustification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingCancelJustification>
 */
class BookingCancelJustificationFactory extends Factory
{
    protected $model = BookingCancelJustification::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory()->state([
                'status' => 'cancelled'
            ]),
            'justification' => fake()->randomElement([
                'Passager non disponible',
                'Condition météorologique instable',
                'Paiement refusé',
            ]),
        ];
    }
}
