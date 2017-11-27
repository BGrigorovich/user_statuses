from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.MainView.as_view(), name='main'),
    url(r'^login/$', views.LoginView.as_view(), name='login'),
    url(r'^users/$', views.UsersListAPIView.as_view(), name='users'),
    url(r'^statuses/$', views.UserStatusesListAPIView.as_view(), name='statuses'),
    url(r'^change-status/$', views.ChangeUserStatusView.as_view(), name='change-status'),
]
