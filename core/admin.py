from django.contrib import admin

from .models import UserStatus, User

admin.site.register(UserStatus)
admin.site.register(User)
