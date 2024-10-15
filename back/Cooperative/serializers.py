from rest_framework import serializers
from .models import *

class ChauffeurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chauffeur
        fields = (
            'id_chauffeur',
            'nom_chauffeur',
            'cin',
            'age',
            'permis',
            'contact',
            'img',
            'disponibilite'
        )
        read_only_fields = ('date_creation', 'date_maj')


class CooperativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooperative
        fields = (
            'id_cooperative',
            'nom_cooperative',
            'img'
        )
        read_only_fields = ('date_creation',)


class ContactCoopSerializer(serializers.ModelSerializer):
    cooperative = serializers.PrimaryKeyRelatedField(queryset=Cooperative.objects.all())

    class Meta:
        model = ContactCoop
        fields = '__all__'


class TypeTransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeTransport
        fields = '__all__'


class StatutTransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatutTransport
        fields = '__all__'


class TransportSerializer(serializers.ModelSerializer):
    cooperative = serializers.PrimaryKeyRelatedField(queryset=Cooperative.objects.all())
    chauffeur = ChauffeurSerializer()
    statut = StatutTransportSerializer()
    typeTransport = serializers.PrimaryKeyRelatedField(queryset=TypeTransport.objects.all())

    class Meta:
        model = Transport
        fields = (
            'id_transport',
            'matricule',
            'cooperative',
            'capacite',
            'typeTransport',
            'chauffeur',  
            'img',
            'statut'
        )
        read_only_fields = ('date_creation',)
