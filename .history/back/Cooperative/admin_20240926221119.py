from django.contrib import admin
from .models import Chauffeur

class ChauffeurAdmin(admin.ModelAdmin):
    list_display = ('id_chauffeur', 'nom_chauffeur', 'cin', 'permis', 'contact', 'date_creation', 'date_maj', 'img')
    list_filter = ('date_creation', 'date_maj', 'permis')
    search_fields = ('nom_chauffeur', 'cin', 'permis', 'contact')
    readonly_fields = ('date_creation', 'date_maj')
    fieldsets = (
        ('Informations Personnelles', {
            'fields': ('nom_chauffeur', 'cin', 'permis', 'contact', 'img')
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )
    list_per_page = 15
    ordering = ('-date_creation',)

admin.site.register(Chauffeur, ChauffeurAdmin)


# Register your models here.
