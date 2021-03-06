# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-06 19:00
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('username', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserStatus',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('status', models.TextField(unique=True)),
                ('color', models.TextField(default='FFFFFF', validators=[django.core.validators.RegexValidator(code='invalid_color', message='Should be valid HTML color code', regex='^[0-9A-Fa-f]{6}$')])),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.UserStatus'),
        ),
    ]
