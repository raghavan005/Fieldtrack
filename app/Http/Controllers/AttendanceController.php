<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * Clock in the authenticated employee.
     */
    public function clockIn(Request $request): RedirectResponse
    {
        $request->validate([
            'lat' => ['required', 'numeric', 'between:-90,90'],
            'lng' => ['required', 'numeric', 'between:-180,180'],
        ]);

        $user = $request->user();

        // Prevent double clock-in
        if ($user->activeAttendance) {
            return back()->with('error', 'You are already clocked in.');
        }

        Attendance::create([
            'user_id'       => $user->id,
            'clock_in_time' => now(),
            'lat'           => $request->lat,
            'lng'           => $request->lng,
        ]);

        return back()->with('success', 'Clocked in successfully.');
    }

    /**
     * Clock out the authenticated employee.
     */
    public function clockOut(Request $request): RedirectResponse
    {
        $user = $request->user();

        $attendance = $user->activeAttendance;

        if (! $attendance) {
            return back()->with('error', 'You are not clocked in.');
        }

        $attendance->update([
            'clock_out_time' => now(),
        ]);

        return back()->with('success', 'Clocked out successfully.');
    }

    /**
     * Return today's attendance history for the employee (JSON for polling).
     */
    public function history(Request $request): JsonResponse
    {
        $records = $request->user()
            ->attendances()
            ->latest()
            ->take(10)
            ->get(['id', 'clock_in_time', 'clock_out_time', 'lat', 'lng']);

        return response()->json($records);
    }
}
