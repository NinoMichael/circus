<?php

namespace App\Http\Controllers;

use App\Models\UserSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    /**
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $settings = $user->userSettings()->get()->mapWithKeys(function ($setting) {
            return [$setting->group => $setting->settings];
        });

        $defaults = UserSetting::getDefaultSettings($user->role);
        
        foreach ($defaults as $group => $defaultValues) {
            if (!isset($settings[$group])) {
                $settings[$group] = $defaultValues;
            }
        }

        return response()->json([
            'data' => $settings,
        ]);
    }

    /**
     * @param Request $request
     * @param string $group
     * 
     * @return JsonResponse
     */
    public function show(Request $request, string $group): JsonResponse
    {
        $user = $request->user();
        
        $setting = $user->userSettings()->where('group', $group)->first();
        
        if (!$setting) {
            $defaults = UserSetting::getDefaultSettings($user->role);
            $defaultGroup = $defaults[$group] ?? null;
            
            return response()->json([
                'data' => [
                    'group' => $group,
                    'settings' => $defaultGroup,
                ],
            ]);
        }

        return response()->json([
            'data' => [
                'group' => $setting->group,
                'settings' => $setting->settings,
            ],
        ]);
    }

    /**
     * @param Request $request
     * @param string $group
     * 
     * @return JsonResponse
     */
    public function update(Request $request, string $group): JsonResponse
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        $user = $request->user();
        
        $user->setSetting($group, $validated['settings']);

        return response()->json([
            'message' => 'Settings updated successfully',
            'data' => [
                'group' => $group,
                'settings' => $validated['settings'],
            ],
        ]);
    }

    /**
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function updateMultiple(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        $user = $request->user();

        foreach ($validated['settings'] as $group => $settings) {
            $user->setSetting($group, $settings);
        }

        return response()->json([
            'message' => 'Settings updated successfully',
        ]);
    }
}
