<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProviderController;



// Public Api ---------------------- Start

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/services', [ServiceController::class, 'index']);

Route::get('/services/{id}', [ServiceController::class, 'show']);



Route::get('/provider/profile/{id}', [ProviderController::class, 'getProfile']);



// Public Api ---------------------- End

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/reviews', [ReviewController::class, 'store']);

    Route::post('/service-requests', [ServiceRequestController::class, 'store']);

    Route::middleware('role:provider')->group(function(){

        Route::post('/services', [ServiceController::class, 'store']);
        Route::get('/provider/requests', [ProviderController::class, 'getMyRequests']);
        Route::patch('/provider/requests/{id}/status', [ProviderController::class, 'updateStatus']);

    });
});
