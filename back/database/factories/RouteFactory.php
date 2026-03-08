<?php

namespace Database\Factories;

use App\Models\Route;
use App\Models\Station;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Route>
 */
class RouteFactory extends Factory
{
    protected $model = Route::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $distance = fake()->numberBetween(50, 900);

        $durationHours = ceil($distance / 60);

        return [
            'departure_station_id' => Station::factory(),
            'arrival_station_id' => Station::factory(),
            'distance' => $distance,
            'estimated_duration' => $durationHours,
        ];
    }
}
