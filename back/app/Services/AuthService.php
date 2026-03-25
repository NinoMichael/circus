<?php

namespace App\Services;

use App\Models\Cooperative;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthService
{
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'firstname' => $data['firstname'],
                'lastname'  => $data['lastname'],
                'email'     => $data['email'],
                'phone'     => $data['phone'],
                'password'  => $data['password'],
            ]);

            Profile::create([
                'user_id'     => $user->id,
                'avatar'      => $data['avatar'] ?? null,
                'birth_date'  => $data['birth_date'] ?? null,
                'national_id' => $data['national_id'],
                'is_male'     => $data['is_male'],
                'address'     => $data['address'],
            ]);

            return $user->load('profile');
        });
    }

    public function cooperativeRegister(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'firstname' => $data['firstname'],
                'lastname'  => $data['lastname'],
                'email'     => $data['email'],
                'phone'     => $data['phone'],
                'password'  => $data['password'],
                'role'      => 'cooperative',
            ]);

            Profile::create([
                'user_id'     => $user->id,
                'avatar'      => $data['avatar'] ?? null,
                'birth_date'  => $data['birth_date'] ?? null,
                'national_id' => $data['national_id'],
                'is_male'     => $data['is_male'],
                'address'     => $data['address'],
            ]);

            Cooperative::create([
                'user_id'     => $user->id,
                'name'        => $data['name'],
                'logo'        => $data['logo'] ?? null,
                'contact_email' => $data['contact_email'],
                'contact_phone' => $data['contact_phone'],
                'status'      => 'pending',
            ]);

            return $user->load(['profile', 'cooperative']);
        });
    }
}
