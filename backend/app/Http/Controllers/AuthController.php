<?php

namespace App\Http\Controllers;


use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;


class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        
        $user = $this->authService->register($request->validated());

        // Token return karo (Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'access_token' => $token,
            'user' => $user
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        
        $result = $this->authService->login($request->validated());

        
        if (!$result) {
            return response()->json([
                'message' => 'Email or Password Wrong'
            ], 401); 
        }

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $result['token'],
            'role' => $result['role'],
            'user' => $result['user']
        ], 200);
    }
}
