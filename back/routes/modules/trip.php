<?php

use App\Http\Controllers\TripController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")->prefix("trips")->group(function() {
    Route::get('/driver/{driver}', [TripController::class, 'indexByDriver']);
});