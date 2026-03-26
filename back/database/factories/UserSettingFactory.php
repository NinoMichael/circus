<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSettingFactory extends Factory
{
    protected $model = UserSetting::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'group' => $this->faker->randomElement(['notifications', 'activity', 'privacy', 'business', 'security']),
            'settings' => $this->generateSettings(),
        ];
    }

    private function generateSettings(): array
    {
        return [
            'notifications' => [
                'sms_alerts' => $this->faker->boolean(),
                'email_reports' => $this->faker->boolean(),
                'security_alerts' => $this->faker->boolean(),
            ],
            'activity' => [
                'status' => $this->faker->randomElement(['available', 'pause', 'offline']),
            ],
            'privacy' => [
                'show_location' => $this->faker->boolean(),
                'show_stats' => $this->faker->boolean(),
            ],
        ];
    }

    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }

    public function forRole(string $role): static
    {
        return $this->state(fn (array $attributes) => [
            'settings' => UserSetting::getDefaultSettings($role),
        ]);
    }
}
