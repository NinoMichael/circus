from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import ChauffeurListCreateView, ChauffeurDetailView

urlpatterns = [
    path('chauffeurs/', ChauffeurListCreateView.as_view(), name='chauffeur-list-create'),
    path('chauffeurs/<int:pk>/', ChauffeurDetailView.as_view(), name='chauffeur-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
