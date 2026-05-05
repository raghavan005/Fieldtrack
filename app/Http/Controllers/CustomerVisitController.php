<?php

namespace App\Http\Controllers;

use App\Models\CustomerVisit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CustomerVisitController extends Controller
{
    /**
     * Store a new customer visit for the authenticated employee.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'remarks'       => ['nullable', 'string', 'max:1000'],
            'lat'           => ['required', 'numeric', 'between:-90,90'],
            'lng'           => ['required', 'numeric', 'between:-180,180'],
        ]);

        CustomerVisit::create([
            'user_id'       => $request->user()->id,
            'customer_name' => $request->customer_name,
            'remarks'       => $request->remarks,
            'lat'           => $request->lat,
            'lng'           => $request->lng,
        ]);

        return back()->with('success', 'Customer visit recorded successfully.');
    }
}
