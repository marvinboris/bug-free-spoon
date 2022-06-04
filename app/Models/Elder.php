<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Elder extends Model
{
    use HasFactory;

    protected $directory = '/images/elders/';

    public $fillable = [
        'name', 'title', 'photo',
    ];

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }
}
