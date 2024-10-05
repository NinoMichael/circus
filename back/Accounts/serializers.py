from rest_framework import serializers
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