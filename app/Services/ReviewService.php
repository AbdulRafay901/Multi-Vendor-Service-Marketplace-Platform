<?php

namespace App\Services;

use App\Models\Review;
use App\Models\ServiceRequest;
use Exception;

class ReviewService
{
    public function submitReview(array $data, $customerId)
    {
        
        $hasCompletedOrder = ServiceRequest::where('customer_id', $customerId)
            ->whereHas('service', function ($query) use ($data) {
                $query->where('provider_id', $data['provider_id']);
            })
            ->where('status', 'completed')
            ->exists();

        
        if (!$hasCompletedOrder) {
            throw new Exception("Aap sirf usi provider ko review de sakte hain jiska order complete ho chuka ho.");
        }

        return Review::create([
            'provider_id' => $data['provider_id'],
            'customer_id' => $customerId,
            'rating'      => $data['rating'],
            'comment'     => $data['comment'] ?? null,
        ]);
    }
}