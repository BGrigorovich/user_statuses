from django.core.validators import RegexValidator
from django.db import models


class UserStatus(models.Model):
    id = models.IntegerField(primary_key=True)
    status = models.TextField(unique=True)
    color = models.TextField(default='FFFFFF', validators=[
        RegexValidator(
            regex='^[0-9A-Fa-f]{6}$',
            message='Should be valid HTML color code',
            code='invalid_color'
        ),
    ])


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.TextField(unique=True)
    status = models.ForeignKey(to='core.UserStatus')
