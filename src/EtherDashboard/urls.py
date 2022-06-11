from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('app.urls'), name='index'),
    path('oauth2', include('oauth2.urls'), name='oauth2'),
    path('dashboard/', include('dashboard.urls'), name='dashboard'),
    path('admin/', admin.site.urls),
]
