from rest_framework import serializers
from .models import Chauffeur

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
            'date_creation',
            'date_maj',
            'img',
            'disponibilite'
        )
        read_only_fields = ('date_creation', 'date_maj')  
