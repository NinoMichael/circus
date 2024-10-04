from django.db import models
from Cooperative.models import *
from Accounts.models import *

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
    axe = models.ForeignKey(Axe, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        verbose_name = "Ville"

    def __str__(self):
        return self.nom_ville

class Gare(models.Model):
    id_gare = models.AutoField(primary_key=True)
    nom_gare = models.CharField(max_length=100)
    ville = models.ForeignKey(Ville, on_delete=models.CASCADE)
    date_creation = models.DateTimeField(default=timezone.now)
    img_gare = models.ImageField(upload_to='Gares/', blank=True)

    class Meta:
        verbose_name = "Gare"

    def __str__(self):
        return self.nom_gare

class ContactGare(models.Model):
    id = models.AutoField(primary_key=True)
    contact = models.CharField(max_length=20)
    gare = models.ForeignKey(Gare, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Contact gare"

    def __str__(self):
        return self.contact
    
class Itineraire(models.Model):
    id_itineraire = models.AutoField(primary_key=True)
    gare_depart = models.ForeignKey(Gare, related_name='gare_depart', on_delete=models.CASCADE)
    gare_arrivee = models.ForeignKey(Gare, related_name='gare_arrivee', on_delete=models.CASCADE)
    distance = models.IntegerField()
    duree = models.IntegerField()
    tarif = models.IntegerField()
    date_creation = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Itineraire"

class Planning(models.Model):
    id_planning = models.AutoField(primary_key=True)
    itineraire = models.ForeignKey(Itineraire, on_delete=models.CASCADE)
    transport = models.ForeignKey(Transport, on_delete=models.CASCADE)
    date_depart = models.DateTimeField()
    date_arrivee = models.DateTimeField()
    place_disponible = models.IntegerField()
    date_creation = models.DateTimeField(default=timezone.now)
    date_maj = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Planning"
    
class Reservation(models.Model):
    id_reservation= models.AutoField(primary_key=True)
    planning = models.ForeignKey(Planning, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    nbre_place = models.IntegerField()
    total_tarif = models.IntegerField()

    class Meta:
        verbose_name = "Reservation"

class Reservant(models.Model):
    id_reservant = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    nom = models.CharField(max_length=200)

    class Meta:
        verbose_name = "Réservant"

    def __str__(self):
        return self.nom

class MethodePaiement(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=30)
      
    class Meta:
        verbose_name = "Méthode paiement"

class Paiement(models.Model):
    id_paiement = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    methode = models.ForeignKey(MethodePaiement, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Paiement"

class StatutNotification(models.Model):
    id = models.AutoField(primary_key=True)
    statut = models.CharField(max_length=30)

    class Meta:
        verbose_name = "Statut notification"

class Notification(models.Model):
    id_notification = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField()
    statut = models.ForeignKey(StatutNotification, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Notification"

# Create your models here.
