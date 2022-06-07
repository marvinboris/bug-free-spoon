<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Elder extends Model
{
    use HasFactory, Notifiable;

    protected $directory = '/images/elders/';

    public $fillable = [
        'school_id', 'name', 'email', 'title', 'photo', 'promotion', 'payment', 'paid',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getPaymentAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function contributions()
    {
        return $this->hasMany(Contribution::class);
    }
}
