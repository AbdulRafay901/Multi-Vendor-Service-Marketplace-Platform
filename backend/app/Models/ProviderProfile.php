<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProviderProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'profile_picture', 
        'skills', 
        'experience', 
        'portfolio_items'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
