<?php

namespace App\Services;

use App\Models\ServiceRequest;

class BookingService
{
    public function createBooking(array $data)
    {
        // Database insertion 
        return ServiceRequest::create([
            'customer_id' => auth()->id(), 
            'service_id' => $data['service_id'],
            'requirements' => $data['requirements'],
            'budget' => $data['budget'],
            'deadline' => $data['deadline'],
            'status' => 'pending', 
        ]);
    }
}