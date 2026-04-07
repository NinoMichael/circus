<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MailjetService
{
    private string $apiKey;
    private string $apiSecret;
    private string $senderEmail;
    private string $senderName;

    public function __construct()
    {
        $this->apiKey = config('services.mailjet.key', env('MAILJET_API_KEY'));
        $this->apiSecret = config('services.mailjet.secret', env('MAILJET_API_SECRET'));
        $this->senderEmail = config('services.mailjet.sender_email', env('MAILJET_SENDER_EMAIL', 'noreply@circus.com'));
        $this->senderName = config('services.mailjet.sender_name', env('MAILJET_SENDER_NAME', 'Circus'));
    }

    public function sendEmail(string $toEmail, string $toName, string $subject, string $htmlContent, string $textContent = ''): bool
    {
        try {
            $response = Http::withBasicAuth($this->apiKey, $this->apiSecret)
                ->post('https://api.mailjet.com/v3.1/send', [
                    'Messages' => [
                        [
                            'From' => [
                                'Email' => $this->senderEmail,
                                'Name' => $this->senderName,
                            ],
                            'To' => [
                                [
                                    'Email' => $toEmail,
                                    'Name' => $toName,
                                ],
                            ],
                            'Subject' => $subject,
                            'HTMLPart' => $htmlContent,
                            'TextPart' => $textContent ?: strip_tags($htmlContent),
                        ]
                    ]
                ]);

            if ($response->failed()) {
                Log::error('Mailjet send failed', [
                    'email' => $toEmail,
                    'subject' => $subject,
                    'response' => $response->json(),
                ]);
                return false;
            }

            Log::info('Mailjet email sent successfully', [
                'email' => $toEmail,
                'subject' => $subject,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Mailjet exception', [
                'email' => $toEmail,
                'subject' => $subject,
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    public function sendPasswordResetEmail(string $toEmail, string $toName, string $resetUrl): bool
    {
        $subject = 'Réinitialisation de votre mot de passe - Circus';
        $htmlContent = view('emails.password-reset', [
            'name' => $toName,
            'resetUrl' => $resetUrl,
        ])->render();

        return $this->sendEmail($toEmail, $toName, $subject, $htmlContent);
    }

    public function sendWelcomeEmail(string $toEmail, string $toName): bool
    {
        $subject = 'Bienvenue sur Circus !';
        $htmlContent = view('emails.welcome', [
            'name' => $toName,
        ])->render();

        return $this->sendEmail($toEmail, $toName, $subject, $htmlContent);
    }
}