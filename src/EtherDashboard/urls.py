from django.contrib import admin
from django.urls import include, path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', include('app.urls'), name='index'),
    path('oauth2', include('oauth2.urls'), name='oauth2'),
    path('dashboard/', include('dashboard.urls'), name='dashboard'),
    path('admin/', admin.site.urls),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('favicon.ico')), name="favicon")
]
