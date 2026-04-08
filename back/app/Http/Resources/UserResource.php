<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'fullname' => $this->fullname,
            'phone' => $this->phone,
            'email' => $this->email,
            'role' => $this->role,
            'is_active' => $this->is_active,
            'archived_at' => $this->archived_at,
            'last_login_at' => $this->last_login_at,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'profile' => $this->whenLoaded('profile'),

            'driver' => $this->whenLoaded('driver', function () {
                return $this->driver;
            }),

            'cooperative' => $this->whenLoaded('cooperative', function () {
                return $this->cooperative;
            }),

            'station' => $this->when($this->role === 'manager', function () {
                $this->loadMissing('station');
                return $this->station;
            }),
        ];
    }
}
