<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingSeat extends Model
{
    protected $table = 'booking_seats';

    protected $fillable = [
        'booking_id',
        'seat_id',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function busSeat(): BelongsTo
    {
        return $this->belongsTo(BusSeat::class, 'seat_id');
    }
}
