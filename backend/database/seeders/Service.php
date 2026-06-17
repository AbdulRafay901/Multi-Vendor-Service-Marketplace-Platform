<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Service extends Seeder // Class ka naam 'Service' kar diya hai tumhare command ke mutabiq
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Pehle check karo agar users table mein koi user pehle se hai
        $user = DB::table('users')->first();

        // 2. Agar koi user nahi hai toh pehle ek dummy user insert karo aur uski ID le lo
        if (!$user) {
            $userId = DB::table('users')->insertGetId([
                'name' => 'Marketplace Vendor',
                'email' => 'vendor_test' . rand(1, 999) . '@example.com', // Unique email taake duplicate error na aaye
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } else {
            // Agar user pehle se maujood hai toh uski ID use karo
            $userId = $user->id;
        }

        // 3. Ab real userId ke sath services insert karo
        DB::table('services')->insert([
            [
                'user_id' => $userId,
                'title' => 'Professional Web Development using Laravel & React',
                'description' => 'I will build a high-performance full-stack website for your business.',
                'category' => 'Web Development',
                'price' => 150,
                'delivery_time' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'title' => 'Modern UI/UX Dashboard Design in Figma',
                'description' => 'I will design a clean and responsive dashboard interface.',
                'category' => 'Graphic Design',
                'price' => 45,
                'delivery_time' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'title' => 'Full SEO Optimization and Website Ranking',
                'description' => 'I will rank your website on the first page of Google.',
                'category' => 'SEO',
                'price' => 30,
                'delivery_time' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}