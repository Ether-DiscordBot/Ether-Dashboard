from django.urls import path

from . import views

urlpatterns = [
    path('/login', views.login, name="login"),
    path('/logout', views.login, name="logout"),
    path('/redirect', views.discord_redirect, name="redirect"),
]