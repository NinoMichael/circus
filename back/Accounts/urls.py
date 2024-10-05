from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('client/', ClientListCreateView.as_view(), name='client-list-create'),
    path('client/<int:pk>/', ClientDetailView.as_view(), name='client-detail'),
    path('adminCoop/', AdminCoopListCreateView.as_view(), name='adminCoop-list-create'),
    path('adminCoop/<int:pk>/', AdminCoopDetailView.as_view(), name='adminCoop-detail'),
    path('superAdmin/', SuperAdminListCreateView.as_view(), name='superAdmin-list-create'),
    path('superAdmin/<int:pk>/', SuperAdminDetailView.as_view(), name='superAdmin-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)