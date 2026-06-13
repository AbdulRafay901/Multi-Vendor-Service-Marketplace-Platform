<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProviderService;

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
}
