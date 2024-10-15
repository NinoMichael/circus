from django.db import models
from django.utils import timezone

class Cooperative(models.Model):
    id_cooperative = models.AutoField(primary_key=True)
    nom_cooperative = models.CharField(max_length=30)
    date_creation = models.DateTimeField(default=timezone.now)
    img = models.ImageField(upload_to='Cooperatives/', null=True, blank=True)

    class Meta:
        verbose_name = "Cooperative"

    def __str__(self):
        return self.nom_cooperative
    
class ContactCoop(models.Model):
    id = models.AutoField(primary_key=True)
    contact = models.CharField(max_length=15, null=True)
    cooperative = models.ForeignKey(Cooperative, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Contact Cooperative"

    def __str__(self):
        return self.contact

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
    
class TypeTransport(models.Model):
    id_type = models.AutoField(primary_key=True)
    intitule = models.CharField(max_length=20)

    class Meta:
        verbose_name = "Type Transport"

    def __str__(self):
        return self.intitule
    
class StatutTransport(models.Model):
    id_statut_bus = models.AutoField(primary_key=True)
    intitule_statut_bus = models.CharField(max_length=30)

    class Meta:
        verbose_name = "Statut Transport"

    def __str__(self):
        return self.intitule_statut_bus

class Transport(models.Model):
    id_transport = models.AutoField(primary_key=True)
    matricule = models.CharField(max_length=10)
    cooperative = models.ForeignKey(Cooperative, on_delete=models.CASCADE)
    capacite = models.IntegerField()
    typeTransport = models.ForeignKey(TypeTransport, on_delete=models.CASCADE)
    chauffeur = models.ForeignKey(Chauffeur, on_delete=models.CASCADE)
    statut = models.ForeignKey(StatutTransport, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='transports/', null=True, blank=True) 
    date_creation = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Transport"

    def __str__(self):
        return self.matricule


