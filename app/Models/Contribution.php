<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    use HasFactory;

    protected $directory = '/images/contributions/';

    protected $fillable = [
        'elder_id', 'year', 'payment', 'paid'
    ];

    public function elder()
    {
        return $this->belongsTo(Elder::class);
    }
}
