<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\MailjetService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PasswordController extends Controller
{
    protected MailjetService $mailService;

    public function __construct(MailjetService $mailService)
    {
        $this->mailService = $mailService;
    }

    /**
     * Send password reset link to user's email
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Si ce compte existe, un lien de réinitialisation sera envoyé.'
            ], 200);
        }

        $token = $this->createPasswordResetToken($user);
        
        $resetUrl = config('app.frontend_url', 'http://localhost:5173') . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);

        $this->mailService->sendPasswordResetEmail($user->email, $user->firstname, $resetUrl);

        return response()->json([
            'message' => 'Si ce compte existe, un lien de réinitialisation sera envoyé.'
        ], 200);
    }

    /**
     * Resend password reset link
     */
    public function resendResetLink(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Si ce compte existe, un lien de réinitialisation sera envoyé.'
            ], 200);
        }

        $existingToken = DB::table('password_reset_tokens')
            ->where('email', $user->email)
            ->first();

        if ($existingToken) {
            $createdAt = Carbon::parse($existingToken->created_at);
            if ($createdAt->diffInMinutes(Carbon::now()) < 5) {
                return response()->json([
                    'message' => 'Un email a déjà été envoyé récemment. Veuillez patienter quelques minutes avant de demander un nouveau lien.'
                ], 429);
            }
        }

        $token = $this->createPasswordResetToken($user);
        
        $resetUrl = config('app.frontend_url', 'http://localhost:5173') . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);

        $this->mailService->sendPasswordResetEmail($user->email, $user->firstname, $resetUrl);

        return response()->json([
            'message' => 'Un nouveau lien de réinitialisation a été envoyé à votre adresse email.'
        ], 200);
    }

    /**
     * Reset user's password
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $data = $request->validated();

        $tokenRecord = DB::table('password_reset_tokens')
            ->where('email', $data['email'])
            ->where('token', $data['token'])
            ->first();

        if (!$tokenRecord) {
            return response()->json([
                'message' => 'Token de réinitialisation invalide ou expiré.'
            ], 422);
        }

        $createdAt = Carbon::parse($tokenRecord->created_at);
        if ($createdAt->diffInMinutes(Carbon::now()) > 60) {
            DB::table('password_reset_tokens')
                ->where('email', $data['email'])
                ->delete();
            
            return response()->json([
                'message' => 'Le lien de réinitialisation a expiré. Veuillez faire une nouvelle demande.'
            ], 422);
        }

        $user = User::where('email', $data['email'])->first();
        
        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé.'
            ], 404);
        }

        $user->password = Hash::make($data['password']);
        $user->save();

        DB::table('password_reset_tokens')
            ->where('email', $data['email'])
            ->delete();

        return response()->json([
            'message' => 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.'
        ], 200);
    }

    /**
     * Create a password reset token
     */
    private function createPasswordResetToken(User $user): string
    {
        DB::table('password_reset_tokens')
            ->where('email', $user->email)
            ->delete();

        $token = Str::random(64);

        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        return $token;
    }
}