from django.contrib import admin
from .models import Axe

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal',)
    list_per_page = 10

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal',)
    list_per_page = 10

admin.site.register(Axe, AxeAdmin)
admin.site.register(Ville, AxeAdmin)
