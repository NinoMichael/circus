<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PerformanceController;

Route::prefix('dashboard')->group(function () {
    Route::get('/kpi/about', [DashboardController::class, 'getKpisAbout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/driver/{driver}/kpi', [DashboardController::class, 'getKpisDriver']);
    Route::get('/driver/{driver}/performance', [PerformanceController::class, 'getDriverPerformance']);
});
