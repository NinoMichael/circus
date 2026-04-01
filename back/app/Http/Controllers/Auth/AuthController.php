<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\UserProfileRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Js;

class AuthController extends Controller
{
    /**
     * @param LoginRequest $request
     * 
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $user = User::with([
            'profile',
            'driver',
            'cooperative',
            'managerStation'
        ])->where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => __('message.auth.failed')
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'message' => __('message.auth.inactive')
            ], 403);
        }

        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->last_login_at = now();
        $user->save();

        $this->createSession($request, $user);

        return response()->json([
            'token'   => $token,
            'user'    => new UserResource($user),
        ]);
    }

    /**
     * @param Request $request
     * @param User $user
     * 
     * @return void
     */
    private function createSession(Request $request, User $user): void
    {
        $userAgent = $request->userAgent();
        $deviceInfo = $this->parseUserAgent($userAgent);

        Session::put('user_id', $user->id);
        Session::put('device_type', $deviceInfo['device_type']);
        Session::put('browser', $deviceInfo['browser']);
        Session::put('os', $deviceInfo['os']);
    }

    /**
     * @param string $userAgent
     * 
     * @return array
     */
    private function parseUserAgent(string $userAgent): array
    {
        $deviceType = 'Desktop';
        $browser = 'Unknown';
        $os = 'Unknown';

        if (preg_match('/mobile/i', $userAgent)) {
            $deviceType = 'Mobile';
        } elseif (preg_match('/tablet/i', $userAgent)) {
            $deviceType = 'Tablet';
        } elseif (preg_match('/bot/i', $userAgent)) {
            $deviceType = 'Bot';
        }

        if (preg_match('/Chrome/i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Safari/i', $userAgent) && !preg_match('/Chrome/i', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Edge/i', $userAgent)) {
            $browser = 'Edge';
        } elseif (preg_match('/Opera/i', $userAgent)) {
            $browser = 'Opera';
        }

        if (preg_match('/Windows/i', $userAgent)) {
            $os = 'Windows';
        } elseif (preg_match('/Mac/i', $userAgent)) {
            $os = 'macOS';
        } elseif (preg_match('/Linux/i', $userAgent)) {
            $os = 'Linux';
        } elseif (preg_match('/Android/i', $userAgent)) {
            $os = 'Android';
        } elseif (preg_match('/iOS|iPhone|iPad/i', $userAgent)) {
            $os = 'iOS';
        }

        return [
            'device_type' => $deviceType,
            'browser' => $browser,
            'os' => $os,
        ];
    }

    /**
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => __('message.auth.logout_success')
        ]);
    }

    /**
     * @param UserProfileRequest $request
     * 
     * @return JsonResponse
     */
    public function update(UserProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        
        $data = $request->validated();

        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];
        $user->phone = $data['phone'];
        $user->email = $data['email'];
        $user->save();

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

        $user->load(['profile']);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => new UserResource($user),
        ]);
    }
}
