<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];

    }


    // --- RELATIONSHIPS (Jo aapko data nikalne mein madad karenge) ---

    // Ek user ki ek hi provider profile hogi
    public function providerProfile()
    {
        return $this->hasOne(ProviderProfile::class);
    }

    // Ek provider multiple services bana sakta hai
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    // Ek customer multiple requests bhej sakta hai
    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class, 'customer_id');
    }
    
}
