<?php

namespace App\Services;

use App\Models\ServiceRequest;  

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
}