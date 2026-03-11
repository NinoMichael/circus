<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * @param LoginRequest $request
     * 
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $user = User::with([
            'profile',
            'driver',
            'cooperative',
            'managerStation'
        ])->where('email', $credentials['email'])->first();

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
            'token'   => $token,
            'user'    => new UserResource($user),
        ]);
    }

    
    /**
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => __('message.auth.logout_success')
        ]);
    }
}
