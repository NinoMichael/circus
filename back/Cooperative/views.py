from rest_framework import generics
from .models import Chauffeur
from .serializers import ChauffeurSerializer
from .models import Transport
from .serializers import TransportSerializer

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

# Create your views here.
