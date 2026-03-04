<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Station extends Model
{
    protected $fillable = [
        'name',
        'city',
        'region',
        'latitude',
        'longitude',
        'manager_user_id',
        'image_cover',
    ];

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_user_id');
    }

    public function departureRoutes(): HasMany
    {
        return $this->hasMany(Route::class, 'departure_station_id');
    }

    public function arrivalRoutes(): HasMany
    {
        return $this->hasMany(Route::class, 'arrival_station_id');
    }
}
