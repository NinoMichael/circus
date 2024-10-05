from rest_framework import serializers
from.models import *

class AxeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Axe
        fields = '__all__'

class VilleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ville
        fields = '__all__'

class GareSerializer(serializers.ModelSerializer):
    ville = serializers.PrimaryKeyRelatedField(queryset = Ville.objects.all())
    class Meta:
        model = Gare
        fields = (
            'id_gare',
            'nom_gare',
            'ville',
            'img_gare',
        )
        read_only_fields = ('date_creation',)

class ContactGareSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactGare
        fields = '__all__'

class ItineraireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Itineraire
        fields = (
            'id_itineraire',
            'gare_depart',
            'gare_arrivee',
            'distance',
            'duree',
            'tarif'
        )
        read_only_fields = ('date_creation',)

class PlanningSerializer(serializers.ModelSerializer):
    itineraire = serializers.PrimaryKeyRelatedField(queryset = Itineraire.objects.all())
    transport = serializers.PrimaryKeyRelatedField(queryset = Transport.objects.all())
    class Meta:
        model = Planning
        fields = (
            'id_planning',
            'itineraire',
            'transport',
            'place_disponible',
        )
    read_only_fields = ('date_creation', 'date_maj','date_depart','date_arrivee',)

class ReservationSerializer(serializers.ModelSerializer):
    planning = serializers.PrimaryKeyRelatedField(queryset = Planning.objects.all())
    class Meta:
        model = Reservation
        fields = (
            'id_reservation',
            'planning',
            'client',
            'nbre_place',
            'total_tarif'
        )
        read_only_fields = ('date',)

class ReservantSerializer(serializers.ModelSerializer):
    reservation = serializers.PrimaryKeyRelatedField(queryset = Reservation.objects.all())
    class Meta:
        model = Reservant
        fields = (
            'id_reservant',
            'reservation',
            'nom'
        )

class MethodePaiementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MethodePaiement
        fields = '__all__'

class PaiementSerializer(serializers.ModelSerializer):
    reservation = serializers.PrimaryKeyRelatedField(queryset = Reservation.objects.all())
    methode = serializers.PrimaryKeyRelatedField(queryset = MethodePaiement.objects.all())
    class Meta:
        model = Paiement
        fields = (
            'id_paiement',
            'reservation',
            'methode'
        )

class StatutNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatutNotification
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(queryset = Client.objects.all())
    statut = serializers.PrimaryKeyRelatedField(queryset = StatutNotification.objects.all())
    class Meta:
        model = Notification
        fields = (
            'id_notification',
            'client',
            'message',
            'statut'
        )
        read_only_fields = ('date',)