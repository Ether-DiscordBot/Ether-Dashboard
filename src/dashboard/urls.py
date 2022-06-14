from django.urls import path

from . import views

urlpatterns = [
    path('', views.guild_list, name="guild list"),
    path('<int:guild_id>', views.guild_dashboard, name='dashboard'),
]