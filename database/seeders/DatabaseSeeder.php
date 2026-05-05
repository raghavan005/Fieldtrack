<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Demo manager account
        User::firstOrCreate(
            ['email' => 'manager@example.com'],
            [
                'name'     => 'Demo Manager',
                'password' => Hash::make('password'),
                'role'     => 'manager',
            ]
        );

        // Demo employee account
        User::firstOrCreate(
            ['email' => 'employee@example.com'],
            [
                'name'     => 'Demo Employee',
                'password' => Hash::make('password'),
                'role'     => 'employee',
            ]
        );
    }
}
