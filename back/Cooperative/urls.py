from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('chauffeur/', ChauffeurListCreateView.as_view(), name='chauffeur-list-create'),
    path('chauffeur/<int:pk>/', ChauffeurDetailView.as_view(), name='chauffeur-detail'),
    path('transport/', TransportListCreateView.as_view(), name='transport-list-create'),
    path('transport/<int:pk>/', TransportDetailView.as_view(), name='transport-detail'),
    path('cooperative/', CooperativeListCreateView.as_view(), name='cooperative-list-create'),
    path('cooperative/<int:pk>/', CooperativeDetailView.as_view(), name='cooperative-detail'),
    path('contactCooperative/', ContactCoopListCreateView.as_view(), name='contactCooperative-list-create'),
    path('contactCooperative/<int:pk>/', CooperativeDetailView.as_view(), name='contactCooperative-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
