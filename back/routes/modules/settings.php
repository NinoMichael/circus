<?php

use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/settings', [SettingsController::class, 'index'])->name('index');
    Route::get('/settings/{group}', [SettingsController::class, 'show'])->name('show');
    Route::put('/settings/{group}', [SettingsController::class, 'update'])->name('update');
    Route::put('/settings', [SettingsController::class, 'updateMultiple'])->name('updateMultiple');
});
