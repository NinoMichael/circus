#from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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



