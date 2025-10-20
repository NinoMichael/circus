<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::prefix('profiles')->name('profile.')->group(function () {
    Route::post('/', [ProfileController::class, 'store'])->name('store');
});