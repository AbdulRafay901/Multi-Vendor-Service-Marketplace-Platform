<?php

// app/Services/AuthService.php
namespace App\Services;

use App\Models\User;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data)
    {
        return DB::transaction(function () use ($data) {
    
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            
            $user->assignRole('customer');

            
            event(new UserRegistered($user));

            return $user;
        });
    }
}