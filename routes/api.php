<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProviderController;    

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/reviews', [ReviewController::class, 'store']);

    Route::post('/service-requests', [ServiceRequestController::class, 'store']);

    Route::middleware('role:provider')->group(function(){
        Route::post('/service', [ServiceController::class, 'store']);
        Route::get('/provider/requests', [ProviderController::class, 'getMyRequests']);
    });
});
