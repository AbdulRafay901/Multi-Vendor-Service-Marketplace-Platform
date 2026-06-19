<?php

namespace App\Services;

use App\Models\ServiceRequest;  
use Exception;

class ProviderService
{
    public function getProviderRequests($providerId)
    {
       
        return ServiceRequest::whereHas('service', function ($query) use ($providerId) {
                $query->where('user_id', $providerId);
            })
            
            ->with([
                'customer:id,name,email', 
                'service:id,title,price,delivery_time'
            ]) 
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function updateOrderStatus($requestId, $providerId, $newStatus)
    {
    
        $order = ServiceRequest::with('service')->find($requestId);

        if (!$order) {
            throw new Exception("Order nahi mila.");
        }

        // STRICT CHECK
        if ($order->service->user_id !== $providerId) {
            throw new Exception("Not Your Order");
        }

    
        $order->status = $newStatus;
        $order->save();

        return $order;
    }
}