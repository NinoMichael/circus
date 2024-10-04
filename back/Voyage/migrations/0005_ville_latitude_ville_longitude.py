# Generated by Django 5.1 on 2024-10-04 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Voyage', '0004_methodepaiement_statutnotification_paiement_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ville',
            name='latitude',
            field=models.FloatField(default=0.0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ville',
            name='longitude',
            field=models.FloatField(default=0.0),
            preserve_default=False,
        ),
    ]
