from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ClientLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

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



