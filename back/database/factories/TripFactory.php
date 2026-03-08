<?php

namespace Database\Factories;

use App\Models\Buse;
use App\Models\Route;
use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    protected $model = Trip::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $route = Route::factory()->create();
        $bus = Buse::factory()->create();

        $departure = Carbon::now()
            ->addDays(rand(1,10))
            ->setTime(rand(5,20), 0);

        $arrival = (clone $departure)->addHours($route->estimated_duration);

        return [
            'route_id' => $route->id,
            'cooperative_id' => $bus->cooperative_id,
            'bus_id' => $bus->id,
            'departure_time' => $departure,
            'arrival_time' => $arrival,
            'fees' => fake()->numberBetween(10000, 200000),
            'available_seats' => $bus->capacity,
            'status' => fake()->randomElement([
                'scheduled',
                'active',
                'completed',
                'cancelled',
            ]),
        ];
    }
}
