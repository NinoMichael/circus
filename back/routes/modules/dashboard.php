<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::prefix('dashboard')->group(function () {
    Route::get('/cities/count', [DashboardController::class, 'countUniqueCities'])->name('cities.count');
    Route::get('/cooperatives/count', [DashboardController::class, 'countCooperatives'])->name('cooperatives.count');
    Route::get('/cooperatives/featured', [DashboardController::class, 'getFiveCooperatives'])->name('cooperatives.featured');
});
