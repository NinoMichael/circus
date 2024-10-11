from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            'id_client',
            'nom_client',
            'cin',
            'contact',
            'identifiant',
            'email',
            'mdp',
            'img'
        )
        read_only_fields = ('date_creation','date_maj',)

class ClientLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    mdp = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        mdp = data.get('mdp')

        # Débogage : affiche les informations de validation
        print(f"Email reçu : {email}")
        print(f"Mot de passe reçu : {mdp}")

        try:
            client = Client.objects.get(email=email)
        except Client.DoesNotExist:
            raise serializers.ValidationError("L'email ou le mot de passe est incorrect.")

        print(f"Mot de passe dans la base de données : {client.mdp}")

        # Vérification du mot de passe
        if not check_password(mdp, client.mdp):
            raise serializers.ValidationError("L'email ou le mot de passe est incorrect.")

        return {
            'email': client.email,
            'tokens': self.get_tokens(client)
        }

    def get_tokens(self, client):
        refresh = RefreshToken.for_user(client)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class AdminCoopSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminCoop
        fields = (
            'id_adminCoop',
            'nom_admin',
            'cin',
            'identifiant',
            'mdp',
            'mdp2',
        )
        read_only_fields = ('date_creation', 'date_maj',)

class SuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperAdmin
        fields = (
            'id_superAdmin',
            'nom_admin',
            'cin',
            'identifiant',
            'mdp',
            'mdp2',
        )
        read_only_fields = ('date_creation', 'date_maj',)