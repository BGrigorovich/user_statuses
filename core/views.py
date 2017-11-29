import json

from django import views
from django.http import JsonResponse
from django.views.generic import TemplateView
from rest_framework import generics

from .models import User, UserStatus
from .serializers import UserSerializer, UserStatusSerializer


class MainView(TemplateView):
    template_name = 'general.html'


class LoginView(views.View):
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body.decode("utf-8"))
        username = request_data.get('username')
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            User(username=username).save()
            user = User.objects.get(username=username)
        return JsonResponse({
            'id': user.pk,
            'username': user.username,
            'status': {
                'id': user.status_id,
                'status': user.status.status if user.status else None,
                'color': user.status.color if user.status else None
            }
        }, status=200)


class ChangeUserStatusView(views.View):
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body.decode("utf-8"))
        user_id = request_data.get('userId')
        status_id = request_data.get('statusId')
        user = User.objects.get(id=user_id)
        user.status_id = status_id
        user.save()
        return JsonResponse({'message': 'ok'}, status=200)


class UsersListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserStatusesListAPIView(generics.ListAPIView):
    queryset = UserStatus.objects.all()
    serializer_class = UserStatusSerializer
