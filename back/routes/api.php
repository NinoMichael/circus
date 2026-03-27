<?php

use Illuminate\Support\Facades\Route;

Route::name('auth.')->group(function () {
    require __DIR__ . '/modules/auth.php';
});

Route::name('users.')->group(function () {
    require __DIR__ . '/modules/users.php';
});

Route::name('contact.')->group(function () {
    require __DIR__ . '/modules/contact.php';
});

Route::name('bus.')->group(function () {
    require __DIR__ . '/modules/bus.php';
});
Route::name('dashboard.')->group(function () {
    require __DIR__ . '/modules/dashboard.php';
});

Route::name('trips.')->group(function () {
    require __DIR__ . '/modules/trip.php';
});

Route::name('settings.')->group(function () {
    require __DIR__ . '/modules/settings.php';
});

Route::name('sessions.')->group(function () {
    require __DIR__ . '/modules/sessions.php';
});

Route::name('notifications.')->group(function () {
    require __DIR__ . '/modules/notifications.php';
});
