from channels import Group
from django.core.validators import RegexValidator
from django.db import models

from .consumers import ws_message


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

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
        message = {
            'user': {
                'id': self.id,
                'username': self.username,
                'status': {
                    'id': self.status_id,
                    'status': self.status.status if self.status else None,
                    'color': self.status.color if self.status else None
                }
            }
        }
        ws_message(message)
