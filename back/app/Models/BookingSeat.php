<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookingSeat extends Model
{
    use HasFactory, SoftDeletes;

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
