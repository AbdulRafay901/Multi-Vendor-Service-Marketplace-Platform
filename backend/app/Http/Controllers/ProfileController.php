<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class ProfileController extends Controller
{
    public function show(Request $request)
    {
       
        return response()->json([
            'user' => $request->user()
        ], 200);
    }

    /**
    
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // 💡 Validation Rules
        $request->validate([
            'name' => 'required|string|max:255',
            
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
           
            'current_password' => 'nullable|required_with:new_password|string',
            
            'new_password' => 'nullable|string|min:8|confirmed',
        ]);

       
        if ($request->filled('new_password')) {
            
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'message' => 'The provided current password does not match our records.'
                ], 422);
            }

            
            $user->password = Hash::make($request->new_password);
        }

  
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully!',
            'user' => $user
        ], 200);
    }
}
