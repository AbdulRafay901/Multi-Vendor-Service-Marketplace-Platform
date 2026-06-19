<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Services\ReviewService;
use Exception;

class ReviewController extends Controller
{
    // 1. Service property define ki
    protected $reviewService;

    // 2. Yahan DOBARA CHECK KAREIN: Double Underscore (__) hona lazmi hai!
    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    // Line 17 waala function jahan error aa raha tha
    public function index()
    {
        try {
            // Safety Check: Agar kisi wajah se abhi bhi service load na ho, toh friendly error milega, app crash nahi hogi
            if (!$this->reviewService) {
                return response()->json([
                    'success' => false,
                    'message' => 'ReviewService initialization failed.'
                ], 500);
            }

            // Reviews fetch ho rahe hain
            $reviews = $this->reviewService->getAllReviews(auth()->user());

            return response()->json([
                'success' => true,
                'data' => $reviews
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Review submit karne ka function
    public function store(ReviewRequest $request)
    {
        try {
            $review = $this->reviewService->submitReview($request->validated(), auth()->id());

            return response()->json([
                'message' => 'Review successfully submitted!',
                'review' => $review
            ], 201); 

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 403);
        }
    }   
}