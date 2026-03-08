<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusSeat extends Model
{
    use HasFactory;

    protected $table = 'bus_seats';

    protected $fillable = [
        'bus_id',
        'seat_number',
        'seat_type',
        'is_available',
    ];

    protected $casts = [
        'is_available' => 'boolean',
    ];

    public function bus(): BelongsTo
    {
        return $this->belongsTo(Buse::class);
    }

    public function bookingSeats(): HasMany
    {
        return $this->hasMany(BookingSeat::class, 'seat_id');
    }
}
