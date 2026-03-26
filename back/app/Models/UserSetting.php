<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'group',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function getDefaultSettings(string $role): array
    {
        $defaults = [
            'driver' => [
                'notifications' => [
                    'sms_alerts' => true,
                    'email_reports' => true,
                    'security_alerts' => true,
                ],
                'activity' => [
                    'status' => 'active',
                ],
                'privacy' => [
                    'show_location' => true,
                    'show_stats' => true,
                ],
            ],
            'passenger' => [
                'notifications' => [
                    'trip_updates' => true,
                    'promotions' => false,
                    'newsletter' => false,
                ],
                'privacy' => [
                    'show_profile' => false,
                ],
            ],
            'cooperative' => [
                'notifications' => [
                    'new_bookings' => true,
                    'reports' => true,
                    'alerts' => true,
                ],
                'business' => [
                    'auto_confirm' => false,
                ],
            ],
            'manager' => [
                'notifications' => [
                    'station_alerts' => true,
                    'reports' => true,
                    'staff_updates' => true,
                ],
            ],
            'admin' => [
                'notifications' => [
                    'system_alerts' => true,
                    'user_reports' => true,
                ],
                'security' => [
                    '2fa_enabled' => false,
                ],
            ],
        ];

        return $defaults[$role] ?? [];
    }
}
