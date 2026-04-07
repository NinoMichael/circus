<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\PasswordController;

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::post('register', [RegisterController::class, 'register']);
Route::post('register-cooperative', [RegisterController::class, 'cooperativeRegister']);

Route::post('forgot-password', [PasswordController::class, 'forgotPassword']);
Route::post('resend-reset-link', [PasswordController::class, 'resendResetLink']);
Route::post('reset-password', [PasswordController::class, 'resetPassword']);
