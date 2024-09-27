from django.contrib import admin
from .models import Chauffeur
import base64

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

    def save_model(self, request, obj, form, change):
        if 'img' in form.changed_data and obj.img:
            with open(obj.img.path, 'rb') as image_file : 
                obj.img_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        super().save_model(request, obj, form, change)

admin.site.register(Chauffeur, ChauffeurAdmin)
