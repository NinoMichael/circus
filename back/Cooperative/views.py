from rest_framework import generics
from .models import *
from .serializers import *

class ChauffeurListCreateView(generics.ListCreateAPIView):
    queryset = Chauffeur.objects.all()
    serializer_class = ChauffeurSerializer

class ChauffeurDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chauffeur.objects.all()
    serializer_class = ChauffeurSerializer

class TransportListCreateView(generics.ListCreateAPIView):
    queryset = Transport.objects.all()
    serializer_class = TransportSerializer

class TransportDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transport.objects.all()
    serializer_class = TransportSerializer

class CooperativeListCreateView(generics.ListCreateAPIView):
    queryset = Cooperative.objects.all()
    serializer_class = CooperativeSerializer

class CooperativeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cooperative.objects.all()
    serializer_class = CooperativeSerializer

class ContactCoopListCreateView(generics.ListCreateAPIView):
    queryset = ContactCoop.objects.all()
    serializer_class = ContactCoopSerializer

class ContactCoopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactCoop.objects.all()
    serializer_class = ContactCoopSerializer

class TypeTransportListCreateView(generics.ListCreateAPIView):
    queryset = TypeTransport.objects.all()
    serializer_class = TypeTransportSerializer

class TypeTransportDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TypeTransport.objects.all()
    serializer_class = TypeTransportSerializer

