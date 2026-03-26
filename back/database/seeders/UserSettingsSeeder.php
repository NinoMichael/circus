<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Seeder;

class UserSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $this->createSettingsForUser($user);
        }

        $this->command->info('User settings seeded successfully for ' . $users->count() . ' users.');
    }

    private function createSettingsForUser(User $user): void
    {
        $settings = UserSetting::getDefaultSettings($user->role);

        foreach ($settings as $group => $settingValue) {
            UserSetting::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'group' => $group,
                ],
                [
                    'settings' => $settingValue,
                ]
            );
        }
    }
}
