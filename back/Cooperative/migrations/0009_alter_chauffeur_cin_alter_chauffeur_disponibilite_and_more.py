# Generated by Django 5.0.4 on 2024-09-27 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0008_remove_chauffeur_img64'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chauffeur',
            name='cin',
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='chauffeur',
            name='disponibilite',
            field=models.BooleanField(default=True, null=True),
        ),
        migrations.AlterField(
            model_name='chauffeur',
            name='permis',
            field=models.CharField(max_length=50, null=True, unique=True),
        ),
    ]
