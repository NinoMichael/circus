<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'archived_at' => 'datetime',
        ];
    }

    public function getFullnameAttribute()
    {
        return $this->firstname . " " . $this->lastname;
    }

    public function isArchived(): bool
    {
        return $this->archived_at !== null;
    }

    public function isPassenger(): bool
    {
        return $this->role === 'passenger';
    }

    public function archive(): bool
    {
        if (!$this->isPassenger()) {
            return false;
        }

        $this->archived_at = now();
        return $this->save();
    }

    public function reactivate(): bool
    {
        if (!$this->isPassenger()) {
            return false;
        }

        $this->archived_at = null;
        return $this->save();
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function cooperative(): HasOne
    {
        return $this->hasOne(Cooperative::class);
    }

    public function driver(): HasOne
    {
        return $this->hasOne(Driver::class);
    }

    public function station(): HasOne
    {
        return $this->hasOne(Station::class, 'manager_user_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }

    public function promoCodes(): HasMany
    {
        return $this->hasMany(PromoCode::class, 'created_by');
    }

    public function promoCodeUsages(): HasMany
    {
        return $this->hasMany(PromoCodeUsage::class);
    }

    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function userSettings(): HasMany
    {
        return $this->hasMany(UserSetting::class, 'user_id');
    }

    public function getSetting(string $group): ?array
    {
        $setting = $this->userSettings()->where('group', $group)->first();
        
        if (!$setting) {
            $defaults = UserSetting::getDefaultSettings($this->role);
            return $defaults[$group] ?? null;
        }
        
        return $setting->settings;
    }

    public function setSetting(string $group, array $settings): self
    {
        $this->userSettings()->updateOrCreate(
            ['group' => $group],
            ['settings' => $settings]
        );
        
        return $this;
    }
}
