from django.shortcuts import render
from .models import Card


def index(request):
    context = {
        'connected': False,
        'presentations': Card.objects.all()
    }
    return render(request, "app/index.html", context)

