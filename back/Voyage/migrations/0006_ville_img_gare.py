# Generated by Django 5.0.4 on 2024-10-06 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Voyage', '0005_ville_latitude_ville_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='ville',
            name='img_gare',
            field=models.ImageField(blank=True, upload_to='Villes/'),
        ),
    ]
