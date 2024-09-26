from django.contrib import admin
from .models import Chauffeur

# Actions personnalisées
def marquer_comme_verifie(modeladmin, request, queryset):
    queryset.update(permis='Vérifié')
marquer_comme_verifie.short_description = "Marquer les permis comme vérifiés"

class ChauffeurAdmin(admin.ModelAdmin):
    # 1. Afficher tous les champs dans la liste de l'admin
    list_display = ('id_chauffeur', 'nom_chauffeur', 'cin', 'permis', 'contact', 'date_creation', 'date_maj')

    # 2. Ajout de filtres pour les dates et les permis
    list_filter = ('date_creation', 'date_maj', 'permis')

    # 3. Champs disponibles pour la recherche
    search_fields = ('nom_chauffeur', 'cin', 'permis', 'contact')

    # 4. Actions personnalisées pour l'admin
    actions = [marquer_comme_verifie]

    # 5. Lecture seule pour les champs automatiques
    readonly_fields = ('date_creation', 'date_maj')

    # 6. Organisation des champs dans la vue de détail
    fieldsets = (
        ('Informations Personnelles', {
            'fields': ('nom_chauffeur', 'cin', 'permis', 'contact')
        }),
        ('Dates', {
            'fields': ('date_creation', 'date_maj'),
        }),
    )

    # 7. Option pour afficher plus d'éléments par page
    list_per_page = 20

    # 8. Ordre par défaut des éléments dans la liste
    ordering = ('-date_creation',)

# Enregistrement du modèle et de sa configuration
admin.site.register(Chauffeur, ChauffeurAdmin)


# Register your models here.
