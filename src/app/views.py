from django.shortcuts import render

from .models import Card
from oauth2.functions import get_access_token, get_user

def index(request):
    if token := get_access_token(request):
        user_context = get_user(token)
        user_context['connected'] = True

    else:
        user_context = {
            'connected': False
        }
    context = {
        "title": "The Discord Bot",
        'user': user_context,
        'presentations': Card.objects.all()
    }

    return render(request, "app/index.html", context)