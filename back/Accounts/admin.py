from django.contrib import admin
from .models import *

class ClientAdmin(admin.ModelAdmin):
    list_display = ('id_client', 'nom_client', 'cin', 'contact', 'identifiant', 'email', 'mdp', 'date_creation')
    list_filter = ('date_creation',)
    search_fields = ('nom_client','identifiant', 'cin', 'email', 'mdp')
    readonly_fields = ('date_creation', 'date_maj')
    fieldsets = (
        ('Informations', {
            'fields': ('nom_client', 'cin', 'contact', 'identifiant', 'email', 'mdp', 'img')  
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)


class AdminCoopAdmin(admin.ModelAdmin):
    list_display = ('id_adminCoop', 'nom_admin', 'cin', 'identifiant', 'mdp', 'mdp2', 'date_creation')
    list_filter = ('date_creation',)
    search_fields = ('nom_admin','identifiant')
    readonly_fields = ('date_creation', 'date_maj')
    fieldsets = (
        ('Informations', {
            'fields': ('nom_admin', 'cin','identifiant', 'mdp', 'mdp2')  
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)

class SuperAdminAdmin(admin.ModelAdmin):
    list_display = ('id_superAdmin', 'nom_admin', 'cin', 'identifiant', 'mdp', 'mdp2', 'date_creation')
    list_filter = ('date_creation',)
    search_fields = ('nom_admin','identifiant')
    readonly_fields = ('date_creation', 'date_maj')
    fieldsets = (
        ('Informations', {
            'fields': ('nom_admin', 'cin','identifiant', 'mdp', 'mdp2')  
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)

admin.site.register(Client, ClientAdmin)
admin.site.register(AdminCoop, AdminCoopAdmin)
admin.site.register(SuperAdmin, SuperAdminAdmin)

# Register your models here.
