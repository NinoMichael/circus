from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class Client(models.Model):
    id_client = models.AutoField(primary_key=True)
    nom_client = models.CharField(max_length=200, null=True)
    cin = models.CharField(max_length=20, unique=True, null=True)
    contact = models.CharField(max_length=15, null=True)
    identifiant = models.CharField(max_length=100, unique=True, null=True)
    email = models.CharField(max_length=100, unique=True)
    mdp = models.CharField(max_length=100, unique=True, null=True)
    date_creation = models.DateTimeField(default=timezone.now)
    date_maj = models.DateTimeField(auto_now=True)
    img = models.ImageField(upload_to='Clients/', null=True, blank=True)

    class Meta:
        verbose_name = "Client"

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if self.mdp and not self.mdp.startswith('pbkdf2_sha256'):
            self.mdp = make_password(self.mdp)
        super(Client, self).save(*args, **kwargs)

class AdminCoop(models.Model):
    id_adminCoop = models.AutoField(primary_key=True)
    nom_admin = models.CharField(max_length=200, null=True)
    cin = models.CharField(max_length=20, unique=True, null=True)
    identifiant = models.CharField(max_length=100, unique=True, null=True)
    mdp = models.CharField(max_length=100, unique=True, null=True)
    mdp2 = models.CharField(max_length=100, unique=True, null=True)
    date_creation = models.DateTimeField(default=timezone.now)
    date_maj = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Admin Cooperative"

    def __str__(self):
        return self.nom_admin
    
    def save(self, *args, **kwargs):
        self.mdp = make_password(self.mdp)
        self.mdp2 = make_password(self.mdp2)
        super(AdminCoop, self).save(*args, **kwargs)

class SuperAdmin(models.Model):
    id_superAdmin = models.AutoField(primary_key=True)
    nom_admin = models.CharField(max_length=200, null=True)
    cin = models.CharField(max_length=20, unique=True, null=True)
    identifiant = models.CharField(max_length=100, unique=True, null=True)
    mdp = models.CharField(max_length=100, unique=True, null=True)
    mdp2 = models.CharField(max_length=100, unique=True, null=True)
    date_creation = models.DateTimeField(default=timezone.now)
    date_maj = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Super admin"

    def __str__(self):
        return self.nom_admin
    
    def save(self, *args, **kwargs):
        self.mdp = make_password(self.mdp)
        self.mdp2 = make_password(self.mdp2)
        super(AdminCoop, self).save(*args, **kwargs)

# Create your models here.
