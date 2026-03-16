<?php

namespace App\Http\Controllers;

use App\Models\Buse;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Buse $buse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function showByDriver(Driver $driver)
    {
        $buse = $driver->buse;

        return response()->json($buse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Buse $buse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Buse $buse)
    {
        //
    }
}
