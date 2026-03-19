<?php

use App\Http\Controllers\BusController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")->prefix("bus")->group(function() {
    Route::get('/{driver}', [BusController::class, 'showByDriver']);
    Route::put('/update/{buse}', [BusController::class, 'update']);
});