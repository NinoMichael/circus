<?php

use App\Http\Controllers\StationController;
use Illuminate\Support\Facades\Route;

Route::prefix("stations")->group(function() {
    Route::get('/', [StationController::class, 'index']);
    Route::get('/cities', [StationController::class, 'byCity']);
});