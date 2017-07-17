import json

from django import views
from django.views.generic import TemplateView
from django.core import serializers
from django.http import HttpResponse, JsonResponse

from .models import User, UserStatus


class MainView(TemplateView):
    template_name = 'user_statuses.html'


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


class UsersListView(views.View):
    def get(self, request, *args, **kwargs):
        return JsonResponse(serializers.serialize('json', User.objects.all()), safe=False)


class UserStatusesListView(views.View):
    def get(self, request, *args, **kwargs):
        return JsonResponse(serializers.serialize('json', UserStatus.objects.all()), safe=False)

