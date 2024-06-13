<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'location',
        'images',
        'event_date',
        'start_time',
        'end_time'
    ];

    protected $casts = [
        'images' => 'array',
        'event_date' => 'datetime',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
