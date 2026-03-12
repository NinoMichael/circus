<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [RegisterController::class, 'register']);
