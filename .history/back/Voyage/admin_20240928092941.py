from django.contrib import admin
from .models import *

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal',)
    list_per_page = 10

class VilleAdmin(admin.ModelAdmin):
    list_display = ('id_ville', 'nom_ville')
    search_fields = ('ville',)
    list_filter = ('id_axe','')
    list_per_page = 15

admin.site.register(Axe, AxeAdmin)
admin.site.register(Ville, VilleAdmin)
