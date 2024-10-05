from rest_framework import generics
from .models import *
from .serializers import *

class AxeListCreateView(generics.ListCreateAPIView):
    queryset = Axe.objects.all()
    serializer_class = AxeSerializer

class AxeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Axe.objects.all()
    serializer_class = AxeSerializer

class VilleListCreateView(generics.ListCreateAPIView):
    queryset = Ville.objects.all()
    serializer_class = VilleSerializer

class VilleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ville.objects.all()
    serializer_class = VilleSerializer

class GareListCreateView(generics.ListCreateAPIView):
    queryset = Gare.objects.all()
    serializer_class = GareSerializer

class GareDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gare.objects.all()
    serializer_class = GareSerializer

class ContactGareListCreateView(generics.ListCreateAPIView):
    queryset = ContactGare.objects.all()
    serializer_class = ContactGareSerializer

class ContactGareDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactGare.objects.all()
    serializer_class = ContactGareSerializer

class ItineraireListCreateView(generics.ListCreateAPIView):
    queryset = Itineraire.objects.all()
    serializer_class = ItineraireSerializer

class ItineraireDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Itineraire.objects.all()
    serializer_class = ItineraireSerializer

class PlanningListCreateView(generics.ListCreateAPIView):
    queryset = Planning.objects.all()
    serializer_class = PlanningSerializer

class PlanningDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Planning.objects.all()
    serializer_class = PlanningSerializer

class ReservationListCreateView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservantListCreateView(generics.ListCreateAPIView):
    queryset = Reservant.objects.all()
    serializer_class = ReservantSerializer

class ReservantDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservant.objects.all()
    serializer_class = ReservantSerializer

class MethodePaiementListCreateView(generics.ListCreateAPIView):
    queryset = MethodePaiement.objects.all()
    serializer_class = MethodePaiementSerializer

class MethodePaiementDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MethodePaiement.objects.all()
    serializer_class = MethodePaiementSerializer

class PaiementListCreateView(generics.ListCreateAPIView):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer

class PaiementDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer

class StatutNotificationListCreateView(generics.ListCreateAPIView):
    queryset = StatutNotification.objects.all()
    serializer_class = StatutNotificationSerializer

class StatutNotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StatutNotification.objects.all()
    serializer_class = StatutNotificationSerializer

class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
