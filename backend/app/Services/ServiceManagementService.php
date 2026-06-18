<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Facades\Storage;     

class ServiceManagementService
{
    public function createService(array $data)
    {
       
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            $path = $data['image']->store('services', 'public');
            $data['image'] = $path;
        }

        return Service::create([
            'user_id'       => auth()->id(),
            'title'         => $data['title'],
            'description'   => $data['description'],
            'price'         => $data['price'],
            'category'      => $data['category'],
            'delivery_time' => $data['delivery_time'],
            'image'         => $data['image'] ?? null,
        ]);
    }
}