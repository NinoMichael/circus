# Generated by Django 5.0.4 on 2024-09-26 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chauffeur',
            name='img',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
