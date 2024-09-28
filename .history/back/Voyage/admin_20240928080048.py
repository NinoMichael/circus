from django.contrib import admin
from .models import *

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')
    search_fields = ('cardinal')
    fieldsets = ( {
            'fields': ('cardinal')  })
    list_per_page = 15


# Register your models here.
