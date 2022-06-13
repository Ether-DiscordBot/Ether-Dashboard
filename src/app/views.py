from django.shortcuts import render
from asgiref.sync import sync_to_async

from .models import Card
from oauth2.functions import get_access_token, get_user

def index(request):
    token = get_access_token(request)
    if not token:
        user_context = {
            'connected': False
        }
    else:
        user_context = get_user(token)
        user_context['connected'] = True
        
    context = {
        "title": "The Discord Bot",
        'user': user_context,
        'presentations': Card.objects.all()
    }
    
    return render(request, "app/index.html", context)

