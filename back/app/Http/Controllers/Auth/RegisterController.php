<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request, AuthService $authService): JsonResponse
    {
        $user = $authService->register($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Inscription réussie.',
            'user'    => $user,
        ], 201);
    }
}
