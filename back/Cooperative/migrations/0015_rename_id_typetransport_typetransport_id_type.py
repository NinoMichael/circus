# Generated by Django 5.1 on 2024-10-04 19:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0014_typetransport_transport_typetransport'),
    ]

    operations = [
        migrations.RenameField(
            model_name='typetransport',
            old_name='id_typeTransport',
            new_name='id_type',
        ),
    ]
