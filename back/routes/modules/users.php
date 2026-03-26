<?php

use App\Http\Controllers\DriverController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/driver/update', [DriverController::class, 'update'])->name('update');
});