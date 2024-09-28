from django.contrib import admin
from .models import *

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal')
    fieldsets =  ('Information', {
            'fields': ('cardinal')  
        }),
    list_per_page = 10

admin.site.register(Axe, AxeAdmin)

# Register your models here.
