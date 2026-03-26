<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\Driver;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DriverController extends Controller
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
    public function show(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserProfileRequest $request)
    {
        $user = $request->user();
        
        $data = $request->validated();

        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];
        $user->phone = $data['phone'];
        $user->email = $data['email'];
        $user->save();

        $driver = $user->driver;
        if ($driver && isset($data['license_number'])) {
            $driver->license_number = $data['license_number'];
            $driver->save();
        }

        $profile = $user->profile;
        
        if ($profile) {
                $profile->birth_date = $data['birth_date'];
                $profile->national_id = $data['national_id'];
                $profile->is_male = (bool) $data['is_male'];
                $profile->address = $data['address'];
                $profile->save();
        } else {
            $profileData = [];
            $profileData['birth_date'] = $data['birth_date'];
            $profileData['national_id'] = $data['national_id'];
            $profileData['is_male'] = (bool) $data['is_male'];
            $profileData['address'] = $data['address'];
            
            if (!empty($profileData)) {
                $profile = Profile::create(array_merge(['user_id' => $user->id], $profileData));
            }
        }

        if ($request->hasFile('avatar')) {
            if ($profile && $profile->avatar) {
                Storage::disk('public')->delete($profile->avatar);
            }
    
            $path = $request->file('avatar')->store('profiles', 'public');
            if ($profile) {
                $profile->avatar = $path;
                $profile->save();
            }
        }

        $user->load(['profile', 'driver']);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        //
    }
}
