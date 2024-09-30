from django.contrib import admin
from .models import *

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal',)
    list_per_page = 10

class VilleAdmin(admin.ModelAdmin):
    list_display = ('id_ville', 'nom_ville')
    search_fields = ('ville',)
    list_filter = ('axe',)
    list_per_page = 15

    def axe_cardinal(self, obj):
        return obj.axe
    axe_cardinal.short_description = 'Axe'

class GareAdmin(admin.ModelAdmin):
    list_display = ('id_gare', 'nom_gare', 'ville', 'date_creation')
    search_fields = ('nom_gare',)
    list_filter = ('ville',)
    readonly_fields = ('date_creation',)
    fieldsets = (
        ('Informations', {
            'fields': ('nom_gare', 'ville', 'img_gare')  
        }),
        ('Date', {
            'fields': ('date_creation',),
        }),
    )

    list_per_page = 15

class ContactGareAdmin(admin.ModelAdmin):
    list_display = ('id', 'contact', 'gare')
    search_fields = ('contact',)
    list_filter = ('gare',)
    list_per_page = 15

class ItineraireAdmin(admin.ModelAdmin):
    list_display = ('id_itineraire', 'gare_depart', 'gare_arrivee', 'distance', 'duree', 'tarif', 'date_creation')
    list_filter = ('distance', 'duree', 'tarif', 'date_creation')
    readonly_fields = ('date_creation',)
    fieldsets = (
        ('Informations', {
            'fields': ('gare_depart', 'gare_arrivee', 'distance', 'duree', 'tarif')  
        }),
        ('Date', {
            'fields': ('date_creation',),
        }),
    )
    ordering = ('date_creation',)
    list_per_page = 15

class PlanningAdmin(admin.ModelAdmin):
    list_display = ('id_planning', 'itineraire', 'transport', 'date_depart', 'date_arrivee', 'place_disponible', 'date_creation')
    search_fields = ('itineraire', 'transport')
    list_filter = ('date_depart', 'date_arrivee', 'date_creation')
    readonly_fields = ('date_creation', 'date_maj')
    fieldsets = (
        ('Informations', {
            'fields': ('itineraire', 'transport', 'date_depart', 'date_arrivee')  
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )
    ordering = ('date_creation',)
    list_per_page = 15

class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id_reservation', 'planning', 'client', 'date', 'nbre_place', 'total_tarif')
    search_fields = ('itineraire', 'transport')
    list_filter = ('date', 'total_tarif')
    readonly_fields = ('date',)
    list_per_page = 15

class MethodePaiementAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')
    search_fields = ('nom',)
    list_per_page = 15

class PaiementAdmin(admin.ModelAdmin):
    list_display = ('id_paiement', 'reservation', 'methode')
    list_filter = ('methode',)
    list_per_page = 15

class StatutNotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'statut')
    list_per_page = 15

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id_notification', 'client', 'message', 'date', 'statut')
    list_filter = ('date', 'statut')
    ordering = ('date',)
    list_per_page = 15

class ReservantAdmin(admin.ModelAdmin):
    list_display = ('id_reservant', 'reservation', 'nom')
    search_fields = ('nom',)
    list_per_page = 15

admin.site.register(Axe, AxeAdmin)
admin.site.register(Ville, VilleAdmin)
admin.site.register(Gare, GareAdmin)
admin.site.register(ContactGare, ContactGareAdmin)
admin.site.register(Itineraire, ItineraireAdmin)
admin.site.register(Planning, PlanningAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(MethodePaiement, MethodePaiementAdmin)
admin.site.register(Paiement, PaiementAdmin)
admin.site.register(StatutNotification, StatutNotificationAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Reservant, ReservantAdmin)