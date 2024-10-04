from rest_framework import generics
from .models import *
from .serializers import *

class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class AdminCoopListCreateView(generics.ListCreateAPIView):
    queryset = AdminCoop.objects.all()
    serializer_class = AdminCoopSerializer

class AdminCoopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AdminCoop.objects.all()
    serializer_class = AdminCoopSerializer

class SuperAdminListCreateView(generics.ListCreateAPIView):
    queryset = SuperAdmin.objects.all()
    serializer_class = SuperAdminSerializer

class SuperAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SuperAdmin.objects.all()
    serializer_class = SuperAdminSerializer



