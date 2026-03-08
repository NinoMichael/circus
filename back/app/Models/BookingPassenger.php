<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookingPassenger extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'booking_passengers';

    protected $fillable = [
        'booking_id',
        'passenger_name',
        'passenger_phone_number',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
