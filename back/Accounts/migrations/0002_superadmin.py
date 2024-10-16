# Generated by Django 5.0.4 on 2024-09-28 07:53

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SuperAdmin',
            fields=[
                ('id_superAdmin', models.AutoField(primary_key=True, serialize=False)),
                ('nom_admin', models.CharField(max_length=200, null=True)),
                ('cin', models.CharField(max_length=20, null=True, unique=True)),
                ('identifiant', models.CharField(max_length=100, null=True, unique=True)),
                ('mdp', models.CharField(max_length=100, null=True, unique=True)),
                ('mdp2', models.CharField(max_length=100, null=True, unique=True)),
                ('date_creation', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name': 'Admin Cooperative',
            },
        ),
    ]
