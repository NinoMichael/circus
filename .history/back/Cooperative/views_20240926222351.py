from rest_framework import generics
from .models import Chauffeur
from .serializers import ChauffeurSerializer

class ChauffeurListCreateView(generics.ListCreateAPIView):
    queryset = Chauffeur.objects.all()
    serializer_class = ChauffeurSerializer

class ChauffeurDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chauffeur.objects.all()
    serializer_class = ChauffeurSerializer


# Create your views here.
