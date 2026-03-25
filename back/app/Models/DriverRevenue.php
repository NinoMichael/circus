<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DriverRevenue extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'driver_id',
        'trip_id',
        'gross_amount',
        'commission_amount',
        'net_amount',
        'passenger_count',
        'fare_per_passenger',
        'status',
        'calculation_date',
    ];

    protected $casts = [
        'gross_amount' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'fare_per_passenger' => 'decimal:2',
        'passenger_count' => 'integer',
        'calculation_date' => 'date',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
