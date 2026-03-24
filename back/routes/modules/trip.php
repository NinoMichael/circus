<?php

use App\Http\Controllers\TripController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")->prefix("trips")->group(function() {
    Route::get('/driver/{driver}', [TripController::class, 'indexByDriver']);
    Route::get('/driver/{driver}/trip/{trip}', [TripController::class, 'show']);
    Route::get('/driver/{driver}/trip/{trip}/boarding', [TripController::class, 'boarding']);
});