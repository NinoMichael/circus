<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login user and create token
     * 
     * @param LoginRequest $request
     * 
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => __('message.auth.failed')
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->last_login_at = now();
        $user->save();

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }
}
