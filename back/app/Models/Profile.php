<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'lastname',
        'firstname',
        'birth_date',
        'gender',
        'avatar_path',
    ];

    public function profileable()
    {
        return $this->morphTo();
    }
}
