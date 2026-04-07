<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
    <style>
        body {
            font-family: 'Plus Jakarta Sans', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-wrapper {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .email-header {
            background-color: #393e46;
            padding: 30px;
            text-align: center;
        }
        .email-header h1 {
            color: #ffcc00;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .email-body {
            padding: 40px 30px;
        }
        .email-body h2 {
            color: #0f172a;
            font-size: 20px;
            margin-top: 0;
            font-weight: 600;
        }
        .email-body p {
            color: #64748b;
            line-height: 1.6;
            margin: 16px 0;
            font-size: 15px;
        }
        .button {
            display: inline-block;
            background-color: #ffcc00;
            color: #0f172a !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 6px;
            margin: 24px 0;
            font-weight: 600;
        }
        .button:hover {
            background-color: #ffd633;
        }
        .email-footer {
            background-color: #f5f5f5;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
        }
        .email-footer p {
            color: #94a3b8;
            font-size: 12px;
            margin: 0;
        }
        .token-info {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            font-size: 14px;
            color: #64748b;
            border-left: 3px solid #ffcc00;
        }
        .highlight {
            color: #ffcc00;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-wrapper">
            <div class="email-header">
                <h1>Circus</h1>
            </div>
            <div class="email-body">
                <h2>Bonjour {{ $name }},</h2>
                <p>
                    Vous avez demandé la réinitialisation de votre mot de passe. 
                    Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
                </p>
                <p style="text-align: center;">
                    <a href="{{ $resetUrl }}" class="button">Réinitialiser mon mot de passe</a>
                </p>
                <div class="token-info">
                    <strong style="color: #0f172a;">Attention :</strong> Ce lien expire dans 1 heure. 
                    Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
                </div>
                <p>
                    Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :
                </p>
                <p style="word-break: break-all; color: #ffcc00; font-size: 13px;">
                    {{ $resetUrl }}
                </p>
            </div>
            <div class="email-footer">
                <p>© {{ date('Y') }} Circus. Tous droits réservés.</p>
            </div>
        </div>
    </div>
</body>
</html>