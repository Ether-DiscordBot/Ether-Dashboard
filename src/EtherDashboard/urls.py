from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('app.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('admin/', admin.site.urls),
]
