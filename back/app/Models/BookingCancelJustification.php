<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingCancelJustification extends Model
{
    protected $table = 'booking_cancel_justifications';

    protected $fillable = [
        'booking_id',
        'justification',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
