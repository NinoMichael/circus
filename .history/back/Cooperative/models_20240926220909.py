from django.db import models
from django.utils import timezone

class Chauffeur(models.Model):
    id_chauffeur = models.AutoField(primary_key=True)  
    nom_chauffeur = models.CharField(max_length=200)
    cin = models.CharField(max_length=20, unique=True)  
    permis = models.CharField(max_length=50, unique=True)            
    contact = models.CharField(max_length=15)           
    date_creation = models.DateTimeField(default=timezone.now)  
    date_maj = models.DateTimeField(auto_now=True) 
    img = models.BinaryField(null=True, blank=True)

    def __str__(self):
        return self.nom_chauffeur

# Create your models here.
