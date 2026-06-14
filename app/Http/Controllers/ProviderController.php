<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProviderService;
use App\Http\Requests\UpdateOrderStatusRequest;
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
}
