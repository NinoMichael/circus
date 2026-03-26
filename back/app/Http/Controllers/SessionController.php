<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SessionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $sessions = DB::table('sessions')
            ->where('user_id', $userId)
            ->orderBy('last_activity', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'ip_address' => $session->ip_address,
                    'user_agent' => $session->user_agent,
                    'device_type' => $session->device_type,
                    'browser' => $session->browser,
                    'os' => $session->os,
                    'country' => $session->country ?? null,
                    'city' => $session->city ?? null,
                    'last_activity' => Carbon::createFromTimestamp($session->last_activity)->format('d M, H:i'),
                    'is_current' => $session->id === request()->session()->getId(),
                ];
            });

        return response()->json([
            'data' => $sessions,
        ]);
    }

    public function destroy(Request $request, string $sessionId): JsonResponse
    {
        DB::table('sessions')
            ->where('id', $sessionId)
            ->where('user_id', $request->user()->id)
            ->delete();

        return response()->json([
            'message' => 'Session terminated successfully',
        ]);
    }

    public function destroyAll(Request $request): JsonResponse
    {
        DB::table('sessions')
            ->where('user_id', $request->user()->id)
            ->where('id', '!=', $request->session()->getId())
            ->delete();

        return response()->json([
            'message' => 'All other sessions terminated successfully',
        ]);
    }
}
