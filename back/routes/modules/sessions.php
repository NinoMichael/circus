<?php

use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/sessions', [SessionController::class, 'index'])->name('index');
    Route::delete('/sessions/{sessionId}', [SessionController::class, 'destroy'])->name('destroy');
    Route::delete('/sessions', [SessionController::class, 'destroyAll'])->name('destroyAll');
});
