<?php

use Illuminate\Support\Facades\Route;

Route::name('auth')->group(function () {
    require __DIR__ . '/modules/auth.php';
});