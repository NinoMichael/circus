from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('axe/', AxeListCreateView.as_view(), name='axe-list-create'),
    path('axe/<int:pk>/', AxeDetailView.as_view(), name='axe-detail'),
    path('ville/', VilleListCreateView.as_view(), name='ville-list-create'),
    path('ville/<int:pk>/', VilleDetailView.as_view(), name='ville-detail'),
    path('gare/', GareListCreateView.as_view(), name='gare-list-create'),
    path('gare/<int:pk>/', GareDetailView.as_view(), name='gare-detail'),
    path('contactGare/', ContactGareListCreateView.as_view(), name='contactGare-list-create'),
    path('contactGare/<int:pk>/', ContactGareDetailView.as_view(), name='contactGare-detail'),
    path('itineraire/', ItineraireListCreateView.as_view(), name='itineraire-list-create'),
    path('itineraire/<int:pk>/', ItineraireDetailView.as_view(), name='itineraire-detail'),
    path('planning/', PlanningListCreateView.as_view(), name='planning-list-create'),
    path('planning/<int:pk>/', PlanningDetailView.as_view(), name='planning-detail'),
    path('reservation/', ReservationListCreateView.as_view(), name='reservation-list-create'),
    path('reservation/<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),
    path('reservant/', ReservantListCreateView.as_view(), name='reservant-list-create'),
    path('reservant/<int:pk>/', ReservantDetailView.as_view(), name='reservant-detail'),
    path('methodePaiement/', MethodePaiementListCreateView.as_view(), name='methodePaiement-list-create'),
    path('methodePaiement/<int:pk>/', MethodePaiementDetailView.as_view(), name='methodePaiement-detail'),
    path('paiement/', PaiementListCreateView.as_view(), name='paiement-list-create'),
    path('paiement/<int:pk>/', PaiementDetailView.as_view(), name='paiement-detail'),
    path('statutNotification/', StatutNotificationListCreateView.as_view(), name='satutNotification-list-create'),
    path('statutNotification/<int:pk>/', StatutNotificationDetailView.as_view(), name='statutNotification-detail'),
    path('notification/', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('notification/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)