<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\CustomerVisitController;
use App\Http\Controllers\EmployeeDashboardController;
use App\Http\Controllers\ManagerDashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

// Redirect /dashboard based on role
Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user->isManager()) {
        return redirect()->route('manager.dashboard');
    }
    return redirect()->route('employee.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ─── Employee Routes ──────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'employee'])->prefix('employee')->name('employee.')->group(function () {
    Route::get('/dashboard', [EmployeeDashboardController::class, 'index'])->name('dashboard');

    // Attendance
    Route::post('/attendance/clock-in', [AttendanceController::class, 'clockIn'])->name('attendance.clock-in');
    Route::post('/attendance/clock-out', [AttendanceController::class, 'clockOut'])->name('attendance.clock-out');

    // Customer visits
    Route::post('/customer-visits', [CustomerVisitController::class, 'store'])->name('customer-visits.store');
});

// ─── Manager Routes ───────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'manager'])->prefix('manager')->name('manager.')->group(function () {
    Route::get('/dashboard', [ManagerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/live-locations', [ManagerDashboardController::class, 'liveLocations'])->name('live-locations');
});

// ─── Profile Routes ───────────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
