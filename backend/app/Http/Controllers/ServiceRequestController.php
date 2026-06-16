<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBookingRequest;
use App\Services\BookingService;

class ServiceRequestController extends Controller
{
    protected $bookingService;

    // Dependency Injection

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function store(StoreBookingRequest $request)
    {
        
        $serviceRequest = $this->bookingService->createBooking($request->validated());

        
        return response()->json([
            'message' => 'Service requested successfully!',
            'data' => $serviceRequest
        ], 201);
    }
}
