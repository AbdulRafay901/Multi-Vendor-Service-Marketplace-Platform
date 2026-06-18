<?php


namespace App\Services;

use App\Models\User;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function register(array $data)
    {
        return DB::transaction(function () use ($data) {
    
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => $data['role'],
            ]);

            
            $user->assignRole($data['role']);      

            $token = $user->createToken('auth_token')->plainTextToken;

            
            event(new UserRegistered($user));

            return $user;
        });
    }

    public function login(array $data)
    {
    
        if (!Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return false; 
        }

        $user = User::where('email', $data['email'])->first();

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'role' => $user->role
        ];
    }
}

