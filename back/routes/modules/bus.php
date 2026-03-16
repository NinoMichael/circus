<?php

use App\Http\Controllers\BusController;
use Illuminate\Support\Facades\Route;

Route::get('bus/{driver}', [BusController::class, 'showByDriver']);