<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::prefix('dashboard')->group(function () {
    Route::get('/kpi/about', [DashboardController::class, 'getKpisAbout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/driver/{driver}/kpi', [DashboardController::class, 'getKpisDriver']);
});
