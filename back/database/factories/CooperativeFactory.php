<?php

namespace Database\Factories;

use App\Models\Cooperative;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cooperative>
 */
class CooperativeFactory extends Factory
{
    protected $model = Cooperative::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Cooperative',
            'logo' => fake()->imageUrl(200, 200, 'business'),
            'contact_email' => fake()->companyEmail(),
            'contact_phone' => fake()->phoneNumber(),
            'status' => fake()->randomElement(['pending','approved','suspended']),
            'user_id' => User::factory()->state([
                'role' => 'cooperative'
            ]),
        ];
    }
}
