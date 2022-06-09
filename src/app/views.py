from django.shortcuts import render
from .models import Card


def index(request):
    print(Card.objects.all())
    context = {
        'connected': False,
        'presentations': Card.objects.all()
    }
    return render(request, "app/index.html", context)

