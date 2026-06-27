<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'title', 
        'description', 
        'category', 
        'price', 
        'delivery_time',
        'image'
    ];

    public function provider()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function requests()
    {
        return $this->hasMany(ServiceRequest::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'provider_id', 'user_id');
    }
}
