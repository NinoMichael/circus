# Generated by Django 5.0.4 on 2024-09-28 06:53

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0009_alter_chauffeur_cin_alter_chauffeur_disponibilite_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cooperative',
            fields=[
                ('id_cooperative', models.AutoField(primary_key=True, serialize=False)),
                ('nom_cooperative', models.CharField(max_length=30)),
                ('contact', models.CharField(max_length=15)),
                ('date_creation', models.DateTimeField(default=django.utils.timezone.now)),
                ('img', models.ImageField(blank=True, null=True, upload_to='Cooperatives/')),
            ],
            options={
                'verbose_name': 'Cooperative',
            },
        ),
    ]
