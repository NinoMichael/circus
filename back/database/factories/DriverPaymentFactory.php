<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\DriverRevenue;
use Illuminate\Database\Eloquent\Factories\Factory;

class DriverPaymentFactory extends Factory
{
    protected $model = \App\Models\DriverPayment::class;

    public function definition(): array
    {
        return [
            'driver_id' => Driver::factory(),
            'driver_revenue_id' => DriverRevenue::factory(),
            'amount' => fake()->randomFloat(2, 30000, 150000),
            'payment_method' => fake()->randomElement(['mvola', 'orange', 'airtel', 'stripe', 'cash']),
            'transaction_reference' => fake()->numerify('TXN-########'),
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'failed']),
            'payment_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'notes' => fake()->sentence(),
        ];
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'payment_date' => now(),
        ]);
    }
}
