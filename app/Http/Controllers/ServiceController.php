<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreServiceRequest;
use App\Services\ServiceManagementService;

class ServiceController extends Controller
{
    protected $serviceManagement;

    public function __construct(ServiceManagementService $serviceManagement)
    {
        $this->serviceManagement = $serviceManagement;
    }

    public function store(StoreServiceRequest $request)
    {
        // Business logic 
        $service = $this->serviceManagement->createService($request->validated());

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service
        ], 201);
    }
}
