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
    chauffeur = serializers.PrimaryKeyRelatedField(queryset=Chauffeur.objects.all())
    nom_chauffeur = serializers.SerializerMethodField()
    statut = serializers.PrimaryKeyRelatedField(queryset=StatutTransport.objects.all())
    intitule_statut_bus = serializers.SerializerMethodField()
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
            'nom_chauffeur',  
            'img',
            'statut',
            'intitule_statut_bus'
        )
        read_only_fields = ('date_creation',)

    def get_nom_chauffeur(self, obj):
        return obj.chauffeur.nom_chauffeur if obj.chauffeur else None
    def get_intitule_statut_bus(self, obj):
        return obj.statut.intitule_statut_bus if obj.statut else None
