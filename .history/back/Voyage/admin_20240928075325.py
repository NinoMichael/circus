from django.contrib import admin
from .models import *

class AxeAdmin(admin.ModelAdmin):
    list_display = ('id_axe', 'cardinal')

# Register your models here.
