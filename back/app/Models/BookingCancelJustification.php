<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BookingCancelJustification extends Model
{
    use HasFactory, SoftDeletes;

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
