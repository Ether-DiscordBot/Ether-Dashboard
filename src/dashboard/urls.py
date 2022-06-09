from django.urls import path

from . import views

urlpatterns = [
    path('', views.guild_list, name="index"),
    path('<int:guild_id>', views.dashboard, name='dashboard'),
]