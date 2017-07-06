from django import views
from django.http import HttpResponse
from django.shortcuts import render


class MainView(views.View):
    def get(self, request, *args, **kwargs):
        return HttpResponse(render(request, template_name='general.html'))
