<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DriverPayment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'driver_id',
        'driver_revenue_id',
        'amount',
        'payment_method',
        'transaction_reference',
        'status',
        'payment_date',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'datetime',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function driverRevenue(): BelongsTo
    {
        return $this->belongsTo(DriverRevenue::class, 'driver_revenue_id');
    }
}
