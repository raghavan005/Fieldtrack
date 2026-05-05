<?php

namespace App\Http\Controllers;

use App\Models\CustomerVisit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ManagerDashboardController extends Controller
{
    public function index(): Response
    {
        // Employees currently clocked in (have an active attendance with no clock_out)
        $clockedInEmployees = User::where('role', 'employee')
            ->with(['activeAttendance'])
            ->get()
            ->filter(fn (User $u) => $u->activeAttendance !== null)
            ->values()
            ->map(fn (User $u) => [
                'id'        => $u->id,
                'name'      => $u->name,
                'email'     => $u->email,
                'lat'       => $u->activeAttendance->lat,
                'lng'       => $u->activeAttendance->lng,
                'clocked_in_at' => $u->activeAttendance->clock_in_time,
            ]);

        // All employees with their latest location (for map markers)
        $allEmployeeLocations = User::where('role', 'employee')
            ->with(['activeAttendance'])
            ->get()
            ->filter(fn (User $u) => $u->activeAttendance?->lat !== null)
            ->values()
            ->map(fn (User $u) => [
                'id'    => $u->id,
                'name'  => $u->name,
                'lat'   => $u->activeAttendance->lat,
                'lng'   => $u->activeAttendance->lng,
            ]);

        // All customer visits with employee info
        $customerVisits = CustomerVisit::with('user:id,name')
            ->latest()
            ->take(50)
            ->get(['id', 'user_id', 'customer_name', 'remarks', 'lat', 'lng', 'created_at']);

        $totalEmployees = User::where('role', 'employee')->count();

        return Inertia::render('Manager/Dashboard', [
            'clockedInEmployees'   => $clockedInEmployees,
            'allEmployeeLocations' => $allEmployeeLocations,
            'customerVisits'       => $customerVisits,
            'totalEmployees'       => $totalEmployees,
            'clockedInCount'       => $clockedInEmployees->count(),
            'googleMapsApiKey'     => config('services.google_maps.key'),
        ]);
    }

    /**
     * JSON endpoint for polling live employee locations.
     */
    public function liveLocations(): \Illuminate\Http\JsonResponse
    {
        $locations = User::where('role', 'employee')
            ->with(['activeAttendance'])
            ->get()
            ->filter(fn (User $u) => $u->activeAttendance?->lat !== null)
            ->values()
            ->map(fn (User $u) => [
                'id'    => $u->id,
                'name'  => $u->name,
                'lat'   => $u->activeAttendance->lat,
                'lng'   => $u->activeAttendance->lng,
            ]);

        return response()->json($locations);
    }
}
