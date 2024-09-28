from django.db import models

class Axe(models.Model):
    id_axe = models.AutoField(primary_key=True)
    cardinal = models.CharField(max_length=20)

    class Meta:
        verbose_name = "Axe"

    def __str__(self):
        return self.cardinal
    
class Ville(models.Model):
    id_ville = models.AutoField(primary_key=True)
    nom_ville = models.CharField(max_length=100)
    id_axe = models.ForeignKey(Axe, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Ville"

    def __str__(self):
        return self.cardinal

# Create your models here.
