# Generated by Django 5.0.4 on 2024-09-29 18:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0003_admincoop_date_maj_client_date_maj_and_more'),
        ('Voyage', '0003_gare_contactgare_itineraire_planning_reservation'),
    ]

    operations = [
        migrations.CreateModel(
            name='MethodePaiement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=30)),
            ],
            options={
                'verbose_name': 'Méthode paiement',
            },
        ),
        migrations.CreateModel(
            name='StatutNotification',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('statut', models.CharField(max_length=30)),
            ],
            options={
                'verbose_name': 'Statut notification',
            },
        ),
        migrations.CreateModel(
            name='Paiement',
            fields=[
                ('id_paiement', models.AutoField(primary_key=True, serialize=False)),
                ('methode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Voyage.methodepaiement')),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Voyage.reservation')),
            ],
            options={
                'verbose_name': 'Paiement',
            },
        ),
        migrations.CreateModel(
            name='Reservant',
            fields=[
                ('id_reservant', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=200)),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Voyage.reservation')),
            ],
            options={
                'verbose_name': 'Réservant',
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id_notification', models.AutoField(primary_key=True, serialize=False)),
                ('message', models.TextField()),
                ('date', models.DateTimeField()),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accounts.client')),
                ('statut', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Voyage.statutnotification')),
            ],
            options={
                'verbose_name': 'Notification',
            },
        ),
    ]
