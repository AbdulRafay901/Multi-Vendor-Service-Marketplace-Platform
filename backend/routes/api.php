<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;



// Public Api ---------------------- Start

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/services', [ServiceController::class, 'index']);

Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::get('/provider/profile/{id}', [ProviderController::class, 'getProfile']);


// Public Api ---------------------- End

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/reviews', [ReviewController::class, 'store']);

    Route::get('/reviews', [ReviewController::class, 'index']);

    Route::post('/service-requests', [ServiceRequestController::class, 'store']);   

    Route::put('/profile/update', [ProfileController::class, 'update']);

        Route::get('admin/stats', [AdminController::class, 'getDashboardStats']);
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::patch('/users/{id}/status', [AdminController::class, 'updateUserStatus']);
    

    

        Route::get('/provider/stats', [ProviderController::class, 'getDashboardStats']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::get('/provider/services', [ServiceController::class, 'myServices']);
        Route::get('/provider/requests', [ProviderController::class, 'getMyRequests']);
        Route::patch('/provider/requests/{id}/status', [ProviderController::class, 'updateStatus']);

    
    Route::get('/customer/stats', [CustomerController::class, 'getDashboardStats']);
    Route::get('/customer/my-requests', [ServiceRequestController::class, 'myRequests']);
});
