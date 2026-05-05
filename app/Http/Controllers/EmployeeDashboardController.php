<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $todayAttendance = $user->attendances()
            ->whereDate('clock_in_time', today())
            ->latest()
            ->first();

        $recentVisits = $user->customerVisits()
            ->latest()
            ->take(10)
            ->get(['id', 'customer_name', 'remarks', 'lat', 'lng', 'created_at']);

        return Inertia::render('Employee/Dashboard', [
            'activeAttendance' => $user->activeAttendance,
            'todayAttendance'  => $todayAttendance,
            'recentVisits'     => $recentVisits,
        ]);
    }
}
