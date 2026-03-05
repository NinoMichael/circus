<?php

use Illuminate\Support\Facades\Route;

Route::name('auth')->group(function () {
    require __DIR__ . '/modules/auth.php';
});

Route::name('users.')->group(function () {
    require __DIR__ . '/modules/users.php';
});

Route::name('contact.')->group(function () {
    require __DIR__ . '/modules/contact.php';
});
