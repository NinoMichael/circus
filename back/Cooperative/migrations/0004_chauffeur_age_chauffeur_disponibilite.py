# Generated by Django 5.0.4 on 2024-09-27 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0003_alter_chauffeur_options_alter_chauffeur_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='chauffeur',
            name='age',
            field=models.IntegerField(default=32),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chauffeur',
            name='disponibilite',
            field=models.BooleanField(default=True),
        ),
    ]
