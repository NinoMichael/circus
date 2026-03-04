<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trip extends Model
{
    protected $fillable = [
        'route_id',
        'cooperative_id',
        'bus_id',
        'departure_time',
        'arrival_time',
        'fees',
        'available_seats',
        'status',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'arrival_time'   => 'datetime',
    ];

    public function route(): BelongsTo
    {
        return $this->belongsTo(Route::class);
    }

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function buse(): BelongsTo
    {
        return $this->belongsTo(Buse::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function promoCodes(): HasMany
    {
        return $this->hasMany(PromoCode::class);
    }
}
