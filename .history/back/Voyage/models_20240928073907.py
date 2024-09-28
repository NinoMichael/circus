from django.db import models
from django.utils import timezone

class Axe(models.Model):
    id_axe = models.AutoField(primary_key=True)
    cardinal = models.CharField(max_length=20)

    class Meta:
        verbose_name = "Axe"

    def __str__(self):
        return self.cardinal

# Create your models here.
