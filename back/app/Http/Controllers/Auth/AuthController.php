<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $user = User::with('profile')
            ->where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => __('message.auth.failed')
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'message' => __('message.auth.inactive')
            ], 403);
        }

        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->last_login_at = now();
        $user->save();

        return response()->json([
            'message' => __('message.auth.success'),
            'token'   => $token,
            'user'    => [
                'id'                => $user->id,
                'email'             => $user->email,
                'role'              => $user->role,
                'contact'           => $user->contact,
                'is_active'         => $user->is_active,
                'last_login_at'     => $user->last_login_at,
                'email_verified_at' => $user->email_verified_at,
                'created_at'        => $user->created_at,
                'profile'           => $user->profile ? [
                    'id'          => $user->profile->id,
                    'avatar'      => $user->profile->avatar,
                    'birth_date'  => $user->profile->birth_date,
                    'national_id' => $user->profile->national_id,
                    'is_male'     => $user->profile->is_male,
                    'address'     => $user->profile->address,
                ] : null,
            ],
        ]);
    }
}
