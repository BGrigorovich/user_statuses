from django.core.validators import RegexValidator
from django.db import models


class UserStatus(models.Model):
    status = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=6, default='FFFFFF', validators=[
        RegexValidator(
            regex='^[0-9A-Fa-f]{6}$',
            message='Should be valid HTML color code',
            code='invalid_color'
        ),
    ])

    def __str__(self):
        return self.status


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    status = models.ForeignKey(to='core.UserStatus', null=True, blank=True)

    def __str__(self):
        return self.username
