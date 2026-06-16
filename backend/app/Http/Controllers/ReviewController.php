<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Services\ReviewService;
use Exception;

class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

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
