<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreServiceRequest;
use App\Services\ServiceManagementService;
use App\Models\Service;

class ServiceController extends Controller
{
    protected $serviceManagement;

    public function __construct(ServiceManagementService $serviceManagement)
    {
        $this->serviceManagement = $serviceManagement;
    }
    public function index(Request $request)
    {
        $query = Service::query()->with('provider:id,name');

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('category', 'like', '%' . $searchTerm . '%');
        }

        $services = $query->latest()->get();

        return response()->json([
            'message' => 'Services fetched successfully',
            'data' => $services
        ], 200);
    }

    public function store(StoreServiceRequest $request)
    {
        // Business logic 

        if ($request->hasFile('image')) {
        // Image store karo 'storage/app/public/services' mein
        $path = $request->file('image')->store('services', 'public');
        $data['image'] = $path; // Ab $data mein image ka path aa gaya
    }


        $service = $this->serviceManagement->createService($request->validated());

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service
        ], 201);
    }

    public function show($id)
    {
        try {
          
            $service = Service::with('provider:id,name')->find($id);

            if (!$service) {
                return response()->json(['message' => 'Service not found'], 404);
            }

            return response()->json([
                'message' => 'Service details fetched successfully',
                'data' => $service
            ], 200);

        } catch (\Exception $e) {
            
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
