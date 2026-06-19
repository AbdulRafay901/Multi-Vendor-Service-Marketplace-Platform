<?php

namespace App\Services;

use App\Models\Review;
use App\Models\ServiceRequest;
use Exception;

class ReviewService
{
    /**
     * Naya Function: Users ke roles ke mutabiq reviews fetch karne ke liye
     */
    public function getAllReviews($user)
    {
        // Agar login user provider hai toh usko mile hue reviews dikhao
        if ($user->role === 'provider') {
            return Review::with(['customer', 'provider'])
                ->where('provider_id', $user->id)
                ->latest()
                ->get();
        }

        // Agar customer hai toh uske apne diye hue reviews dikhao
        return Review::with(['customer', 'provider'])
            ->where('customer_id', $user->id)
            ->latest()
            ->get();
    }

    /**
     * Aapka Pehle se Maujood Function (With Comment/Feedback Fix)
     */
    public function submitReview(array $data, $customerId)
    {
        // Check order completion
        $hasCompletedOrder = ServiceRequest::where('customer_id', $customerId)
            ->whereHas('service', function ($query) use ($data) {
                $query->where('user_id', $data['provider_id']);
            })
            ->where('status', 'Completed')
            ->exists();

        if (!$hasCompletedOrder) {
            throw new Exception("Aap sirf usi provider ko review de sakte hain jiska order complete ho chuka ho.");
        }

        return Review::create([
            'provider_id' => $data['provider_id'],
            'customer_id' => $customerId,
            'rating'      => $data['rating'],
            // FIX: Agar frontend se 'feedback' aaye ya 'comment', dono surto mein data sahi save ho
            'comment'     => $data['feedback'] ?? $data['comment'] ?? null,
        ]);
    }
}