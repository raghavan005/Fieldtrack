<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'user_id',
        'clock_in_time',
        'clock_out_time',
        'lat',
        'lng',
    ];

    protected function casts(): array
    {
        return [
            'clock_in_time'  => 'datetime',
            'clock_out_time' => 'datetime',
            'lat'            => 'float',
            'lng'            => 'float',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
