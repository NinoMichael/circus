from django.urls import path
from . import views

urlpatterns = [
    path('home', views.index, name = 'home'),
    path('explore', views.explore, name = 'explore'),
    path('book-info', views.bookInfo, name = 'bookInfo'),
    path('book-place', views.bookPlace, name = 'bookPlace'),
    path('book-payment', views.bookPayment, name = 'bookPayment'),
    path('details', views.details, name = 'details'),
]