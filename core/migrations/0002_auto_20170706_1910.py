# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-06 19:10
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='userstatus',
            name='color',
            field=models.CharField(default='FFFFFF', max_length=6, validators=[django.core.validators.RegexValidator(code='invalid_color', message='Should be valid HTML color code', regex='^[0-9A-Fa-f]{6}$')]),
        ),
        migrations.AlterField(
            model_name='userstatus',
            name='status',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
