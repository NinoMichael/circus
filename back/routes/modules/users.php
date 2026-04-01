<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DriverController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/driver/update', [DriverController::class, 'update'])->name('update');
    Route::put('/visitor/update', [AuthController::class, 'update'])->name('update-visitor');
    Route::post('/visitor/deactivate', [AuthController::class, 'deactivate'])->name('deactivate-visitor');
    Route::post('/visitor/reactivate', [AuthController::class, 'reactivate'])->name('reactivate-visitor');
    Route::post('/visitor/delete', [AuthController::class, 'delete'])->name('delete-visitor');
});