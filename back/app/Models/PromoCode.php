<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PromoCode extends Model
{
    protected $table = 'promo_codes';

    protected $fillable = [
        'code',
        'description',
        'discount_type',
        'discount_value',
        'max_discount_value',
        'usage_limit',
        'valid_from',
        'valid_until',
        'cooperative_id',
        'trip_id',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'valid_from'  => 'datetime',
        'valid_until' => 'datetime',
        'is_active'   => 'boolean',
    ];

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function usages(): HasMany
    {
        return $this->hasMany(PromoCodeUsage::class);
    }
}
