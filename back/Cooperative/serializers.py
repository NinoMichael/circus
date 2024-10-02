from rest_framework import serializers
from .models import Chauffeur, Transport, Cooperative

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

class TransportSerializer(serializers.ModelSerializer):
    cooperative = serializers.PrimaryKeyRelatedField(queryset=Cooperative.objects.all())  
    chauffeur = serializers.PrimaryKeyRelatedField(queryset=Chauffeur.objects.all())  

    class Meta:
        model = Transport
        fields = (
            'id_transport',
            'matricule',
            'cooperative',  
            'capacite',
            'chauffeur',    
            'img',
            'date_creation', 
        )
        read_only_fields = ('date_creation',)  
