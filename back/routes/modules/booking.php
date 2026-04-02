<?php

use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")->prefix("bookings")->group(function() {
    Route::get('/', [BookingController::class, 'index']);
    Route::get('/{booking}', [BookingController::class, 'show']);
    Route::put('/{booking}/cancel', [BookingController::class, 'cancel']);
});
