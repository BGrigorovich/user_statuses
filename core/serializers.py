from rest_framework import serializers

from .models import User, UserStatus


class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStatus
        fields = ('id', 'status', 'color')


class UserSerializer(serializers.ModelSerializer):
    status = UserStatusSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'status')
