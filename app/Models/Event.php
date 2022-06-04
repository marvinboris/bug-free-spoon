<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Event extends Model
{
    use HasFactory, Sluggable;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'stringified'
            ]
        ];
    }

    protected $directory = '/images/events/';

    public $fillable = [
        'title', 'description', 'body', 'photo', 'date', 'slug'
    ];

    protected $appends = [
        'link', 'stringified',
    ];

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getDescriptionAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getBodyAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getStringifiedAttribute()
    {
        return $this->title[env('MIX_DEFAULT_LANG', 'fr')];
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getLinkAttribute()
    {
        return '/events/' . $this->slug;
    }
}
