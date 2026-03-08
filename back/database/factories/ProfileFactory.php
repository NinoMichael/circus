<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'avatar' => fake()->imageUrl(200, 200, 'people'),
            'birth_date' => fake()->date(),
            'national_id' => fake()->unique()->numerify('###########'),
            'is_male' => fake()->boolean(),
            'address' => fake()->address(),
        ];
    }
}
