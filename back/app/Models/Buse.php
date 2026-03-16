<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buse extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'buses';

    protected $fillable = [
        'cooperative_id',
        'driver_id',
        'registration_number',
        'type',
        'capacity',
        'cover_image_path',
        'status',
    ];

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function busSeats(): HasMany
    {
        return $this->hasMany(BusSeat::class);
    }

    public function trips(): HasMany
    {
        return $this->hasMany(Trip::class);
    }
}
