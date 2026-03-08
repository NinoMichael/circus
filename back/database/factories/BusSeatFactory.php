<?php

namespace Database\Factories;

use App\Models\BusSeat;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Bus;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BusSeat>
 */
class BusSeatFactory extends Factory
{
    protected $model = BusSeat::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bus_id' => Bus::factory(),
            'seat_number' => fake()->unique()->bothify('S##'),
            'seat_type' => fake()->randomElement(['normal', 'front']),
            'is_available' => true,
        ];
    }
}
