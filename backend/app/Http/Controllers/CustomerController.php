<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceRequest;

class CustomerController extends Controller
{
    public function getDashboardStats(Request $request)
    {
        $user = $request->user();

        // Database se counts fetch karna
        $stats = [
            'total_requests' => ServiceRequest::where('customer_id', $user->id)->count(),
            'active_projects' => ServiceRequest::where('customer_id', $user->id)->where('status', 'active')->count(),
            'pending_requests' => ServiceRequest::where('customer_id', $user->id)->where('status', 'pending')->count(),
            'completed_orders' => ServiceRequest::where('customer_id', $user->id)->where('status', 'completed')->count(),
        ];

        return response()->json(['stats' => $stats]);
    }
}