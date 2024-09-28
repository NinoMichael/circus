from django.contrib import admin
from .models import Axe

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal',)
    fieldsets = (
        ('Informations sur l\'axe', {
            'fields': ('id_axe', 'cardinal')
        }),
    )

    list_per_page = 10

admin.site.register(Axe, AxeAdmin)
