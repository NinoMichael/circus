<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

class DriverRevenueFactory extends Factory
{
    protected $model = \App\Models\DriverRevenue::class;

    public function definition(): array
    {
        $grossAmount = fake()->randomFloat(2, 50000, 200000);
        $commissionRate = fake()->randomFloat(2, 0.05, 0.15);
        $commissionAmount = $grossAmount * $commissionRate;

        return [
            'driver_id' => Driver::factory(),
            'trip_id' => Trip::factory(),
            'gross_amount' => $grossAmount,
            'commission_amount' => $commissionAmount,
            'net_amount' => $grossAmount - $commissionAmount,
            'passenger_count' => fake()->numberBetween(1, 30),
            'fare_per_passenger' => fake()->randomFloat(2, 2000, 10000),
            'status' => fake()->randomElement(['pending', 'calculated', 'paid']),
            'calculation_date' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }

    public function calculated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'calculated',
            'calculation_date' => now(),
        ]);
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'calculation_date' => now(),
        ]);
    }
}
