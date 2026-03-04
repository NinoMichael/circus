<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Buse extends Model
{
    protected $fillable = [
        'cooperative_id',
        'driver_id',
        'type',
        'capacity',
        'status',
    ];

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function busSeats(): HasMany
    {
        return $this->hasMany(BusSeat::class);
    }

    public function trips(): HasMany
    {
        return $this->hasMany(Trip::class);
    }
}
