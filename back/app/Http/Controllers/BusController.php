<?php

namespace App\Http\Controllers;

use App\Http\Requests\BuseRequest;
use App\Models\Buse;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
    public function update(BuseRequest $request, Buse $buse)
    {
        $data = $request->validated();

        $buse->driver_id = $data['driver_id'];
        $buse->type = $data['type'];
        $buse->registration_number = $data['registration_number'];
        $buse->capacity = $data['capacity'];
        $buse->status = $data['status'];

        if ($request->hasFile('cover_image_path')) {

            if ($buse->cover_image_path) {
                Storage::disk('public')->delete($buse->cover_image_path);
            }
    
            $path = $request->file('cover_image_path')->store('buses', 'public');
    
            $buse->cover_image_path = $path;
        }
    
        $buse->save();

        return response()->json([
            'message' => 'Véhicule mis à jour avec succès',
            'data' => $buse
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Buse $buse)
    {
        //
    }
}
