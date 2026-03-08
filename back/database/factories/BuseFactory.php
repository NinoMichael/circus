<?php

namespace Database\Factories;

use App\Models\Buse;
use App\Models\BusSeat;
use App\Models\Cooperative;
use App\Models\Driver;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BuseFactory extends Factory
{
    protected $model = Buse::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['sprinter','mazda','truck']);

        $capacity = match($type) {
            'sprinter' => 24,
            'mazda' => 16,
            'truck' => 30
        };

        return [
            'cooperative_id' => Cooperative::factory(),
            'driver_id' => Driver::factory(),
            'type' => $type,
            'capacity' => $capacity,
            'status' => fake()->randomElement(['active','maintenance','suspended']),
        ];
    }

    /**
     * Associate bus seats factory to bus.
     */
    public function configure()
    {
        return $this->afterCreating(function (Buse $bus) {

            for ($i = 1; $i <= $bus->capacity; $i++) {

                BusSeat::create([
                    'bus_id' => $bus->id,
                    'seat_number' => 'S' . str_pad($i, 2, '0', STR_PAD_LEFT),
                    'seat_type' => $i <= 2 ? 'front' : 'normal',
                    'is_available' => true
                ]);

            }

        });
    }
}
