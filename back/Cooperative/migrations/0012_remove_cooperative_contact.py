# Generated by Django 5.0.4 on 2024-09-28 07:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0011_contactcoop'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cooperative',
            name='contact',
        ),
    ]
