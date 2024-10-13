from django.contrib import admin
from .models import *

class CooperativeAdmin(admin.ModelAdmin):
    list_display = ('id_cooperative', 'nom_cooperative', 'date_creation')
    list_filter = ('date_creation',)
    search_fields = ('nom_cooperative',)
    readonly_fields = ('date_creation',)
    fieldsets = (
        ('Informations', {
            'fields': ('nom_cooperative', 'img')  
        }),
        ('Dates', {
            'fields': ('date_creation',),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)

class ContactCoopAdmin(admin.ModelAdmin):
    list_display = ('id', 'contact', 'cooperative')
    search_fields = ('contact',)
    list_per_page = 15

class TransportAdmin(admin.ModelAdmin):
    list_display = ('id_transport', 'matricule', 'cooperative', 'capacite', 'chauffeur', 'date_creation')
    list_filter = ('date_creation', 'cooperative')
    search_fields = ('matricule',)
    readonly_fields = ('date_creation',)
    fieldsets = (
        ('Informations', {
            'fields': ('matricule', 'cooperative', 'capacite', 'chauffeur', 'img')  
        }),
        ('Dates', {
            'fields': ('date_creation',),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)


class ChauffeurAdmin(admin.ModelAdmin):
    list_display = ('id_chauffeur', 'nom_chauffeur', 'cin', 'age', 'permis', 'contact', 'date_creation', 'date_maj', 'disponibilite')
    list_filter = ('date_creation', 'date_maj', 'disponibilite')
    search_fields = ('nom_chauffeur', 'cin', 'permis', 'contact')
    readonly_fields = ('date_creation', 'date_maj')
    fieldsets = (
        ('Informations Personnelles', {
            'fields': ('nom_chauffeur', 'cin', 'age', 'permis', 'contact', 'img', 'disponibilite')  
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)

class TransportAdmin(admin.ModelAdmin):
    list_display = ('matricule', 'cooperative', 'capacite', 'typeTransport', 'chauffeur', 'date_creation')
    search_fields = ('matricule', 'cooperative__nom_cooperative', 'typeTransport__intitule', 'chauffeur__nom_chauffeur')
    list_filter = ('cooperative', 'typeTransport', 'date_creation')  
    readonly_fields = ('date_creation',)
    fieldsets = (
        ('Informations du Transport', {
            'fields': ('matricule', 'cooperative', 'capacite', 'typeTransport', 'chauffeur', 'img')  
        }),
        ('Dates', {
            'fields': ('date_creation',),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)

class TypeTransportAdmin(admin.ModelAdmin):
    list_display = ('id_type', 'intitule')  
    search_fields = ('intitule',)
    list_per_page = 15

admin.site.register(Chauffeur, ChauffeurAdmin)
admin.site.register(Cooperative, CooperativeAdmin)
admin.site.register(ContactCoop, ContactCoopAdmin)
admin.site.register(Transport, TransportAdmin)
admin.site.register(TypeTransport, TypeTransportAdmin)

