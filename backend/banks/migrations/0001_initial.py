# Generated by Django 5.0.6 on 2024-06-25 03:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=32)),
                ('address', models.TextField()),
                ('phone', models.CharField(max_length=16)),
                ('bank', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='branches', to='banks.bank')),
            ],
        ),
    ]