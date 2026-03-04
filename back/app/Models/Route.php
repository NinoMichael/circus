<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Route extends Model
{
    protected $fillable = [
        'departure_station_id',
        'arrival_station_id',
        'distance',
        'estimated_duration',
    ];

    public function departureStation(): BelongsTo
    {
        return $this->belongsTo(Station::class, 'departure_station_id');
    }

    public function arrivalStation(): BelongsTo
    {
        return $this->belongsTo(Station::class, 'arrival_station_id');
    }

    public function trips(): HasMany
    {
        return $this->hasMany(Trip::class);
    }
}
