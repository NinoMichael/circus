from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import ChauffeurListCreateView, ChauffeurDetailView, TransportListCreateView, TransportDetailView

urlpatterns = [
    path('chauffeur/', ChauffeurListCreateView.as_view(), name='chauffeur-list-create'),
    path('chauffeur/<int:pk>/', ChauffeurDetailView.as_view(), name='chauffeur-detail'),
    path('transport/', TransportListCreateView.as_view(), name='transport-list-create'),
    path('transport/<int:pk>/', TransportDetailView.as_view(), name='transport-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
