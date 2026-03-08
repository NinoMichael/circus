<?php

namespace Database\Factories;

use App\Models\Cooperative;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'cooperative_id' => Cooperative::factory(),
            'rating' => fake()->optional()->numberBetween(1,5),
            'comment' => fake()->optional()->sentence(12),
        ];
    }
}
