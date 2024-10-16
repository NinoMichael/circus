# Generated by Django 5.1 on 2024-10-04 15:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cooperative', '0013_transport'),
    ]

    operations = [
        migrations.CreateModel(
            name='TypeTransport',
            fields=[
                ('id_typeTransport', models.AutoField(primary_key=True, serialize=False)),
                ('intitule', models.CharField(max_length=20)),
            ],
            options={
                'verbose_name': 'Type Transport',
            },
        ),
        migrations.AddField(
            model_name='transport',
            name='typeTransport',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Cooperative.typetransport'),
            preserve_default=False,
        ),
    ]
