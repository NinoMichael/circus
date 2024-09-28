from django.db import models
from django.utils import timezone

class Chauffeur(models.Model):
    id_chauffeur = models.AutoField(primary_key=True)
    nom_chauffeur = models.CharField(max_length=200)
    cin = models.CharField(max_length=20, unique=True, null=True)
    age = models.IntegerField()
    permis = models.CharField(max_length=50, unique=True, null=True)
    contact = models.CharField(max_length=15)
    date_creation = models.DateTimeField(default=timezone.now)
    date_maj = models.DateTimeField(auto_now=True)
    img = models.ImageField(upload_to='chauffeurs/', null=True, blank=True) 
    disponibilite = models.BooleanField(default=True, null=True)

    class Meta:
        verbose_name = "Chauffeur"

    def __str__(self):
        return self.nom_chauffeur

# Create your models here.
