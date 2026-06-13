<?php

namespace App\Services;

use App\Models\Service;

class ServiceManagementService
{
    public function createService(array $data)
    {

        return Service::create([
            'user_id' => auth()->id(),
            'title' => $data['title'],
            'description' => $data['description'],
            'price' => $data['price'],
        ]);
    }
}