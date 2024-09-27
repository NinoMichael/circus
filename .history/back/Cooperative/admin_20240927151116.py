from django.contrib import admin
from .models import Chauffeur

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

admin.site.register(Chauffeur, ChauffeurAdmin)
