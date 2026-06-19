<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Service;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getDashboardStats()
    {
        $stats = [
            'total_users'    => User::count(),
            'total_services' => Service::count(),
            'total_projects' => ServiceRequest::count(),
            'total_earnings' => ServiceRequest::whereIn('status', ['completed', 'delivered'])->sum('budget'),
        ];

        
        $usersOverview = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->orderBy('date')
            ->get();

       
        $projectsStatus = ServiceRequest::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        return response()->json([
            'stats' => $stats,
            'users_overview' => $usersOverview,
            'projects_status' => $projectsStatus,
        ]);
    }

    public function getUsers(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role') && $request->role !== 'all') {
            $query->where('role', $request->role);
        }

        $users = $query->latest()->paginate(10);

        return response()->json([
            'message' => 'Users fetched successfully',
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    public function updateUserStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:active,inactive']);

        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();

        return response()->json(['message' => 'User status updated', 'data' => $user]);
    }
}