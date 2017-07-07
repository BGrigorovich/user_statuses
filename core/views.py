from django import views
from django.views.generic import TemplateView
from django.core import serializers
from django.http import HttpResponse, JsonResponse

from .models import User, UserStatus


class MainView(TemplateView):
    template_name = 'user_statuses.html'


class LoginView(views.View):
    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        user = User.objects.get_or_create(username=username)
        return JsonResponse({
            'id': user.id,
            'username': user.username,
            'status': user.status_id,
            'status_color': user.status.color
        }, status=200)


class ChangeUserStatusView(views.View):
    def post(self, request, *args, **kwargs):
        user_id = request.POST.get('user_id')
        status_id = request.POST.get('status_id')
        User.objects.filter(id=user_id).update(status_id=status_id)
        return JsonResponse({'message': 'ok'}, status=200)


class UsersListView(views.View):
    def get(self, request, *args, **kwargs):
        return JsonResponse(serializers.serialize('json', User.objects.all()))


class UserStatusesListView(views.View):
    def get(self, request, *args, **kwargs):
        return JsonResponse(serializers.serialize('json', UserStatus.objects.all()))

