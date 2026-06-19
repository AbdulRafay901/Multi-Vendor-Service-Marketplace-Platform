<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProviderService;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Models\User;
use Exception;

class ProviderController extends Controller
{
    protected $providerService;

    public function __construct(ProviderService $providerService)
    {
        $this->providerService = $providerService;
    }

    public function getMyRequests(Request $request)
    {
        
        $providerId = auth()->id();
        
        $requests = $this->providerService->getProviderRequests($providerId);

        return response()->json([
            'message' => 'Requests fetched successfully',
            'data' => $requests
        ], 200);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, $id)
    {
        try {
            $providerId = auth()->id();
            $newStatus = $request->validated()['status'];

        
            $updatedOrder = $this->providerService->updateOrderStatus($id, $providerId, $newStatus);

            return response()->json([
                'message' => 'Order status updated successfully!',
                'data' => $updatedOrder
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 403);
        }
    }
    public function getProfile($id)
    {
        
        $provider = User::with('services')
            ->withAvg('reviews', 'rating') 
            ->findOrFail($id);

        return response()->json([
            'message' => 'Provider profile fetched successfully',
            'data' => [
                'provider' => $provider,
                'average_rating' => round($provider->reviews_avg_rating, 2) 
            ]
        ], 200);
    }

    public function getDashboardStats()
{
    $providerId = auth()->id();
    
    // Stats calculation
    $stats = [
        'total_earnings' => \App\Models\ServiceRequest::whereHas('service', fn($q) => $q->where('user_id', $providerId))->sum('budget'),
        'active_projects' => \App\Models\ServiceRequest::whereHas('service', fn($q) => $q->where('user_id', $providerId))->where('status', 'in_progress')->count(),
        'pending_requests' => \App\Models\ServiceRequest::whereHas('service', fn($q) => $q->where('user_id', $providerId))->where('status', 'pending')->count(),
        'completed_orders' => \App\Models\ServiceRequest::whereHas('service', fn($q) => $q->where('user_id', $providerId))->where('status', 'completed')->count(),
    ];

    // Recent 5 orders le aao
    $recentOrders = \App\Models\ServiceRequest::whereHas('service', fn($q) => $q->where('user_id', $providerId))
        ->with(['service', 'customer'])
        ->latest()
        ->take(5)
        ->get();

    return response()->json(['stats' => $stats, 'recent_orders' => $recentOrders]);
}
}
