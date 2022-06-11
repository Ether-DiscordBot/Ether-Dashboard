from django.http import HttpResponse
from django.shortcuts import render
from oauth2.functions import get_access_token, get_user, get_guilds

min_permission = 4398046511103

def guild_list(request):
    token = get_access_token(request)
    guilds = get_guilds(token)
    context = {
        "guilds": [g for g in guilds if int(g['permissions']) >= min_permission]
    }
    return render(request, "dashboard/index.html", context=context)

def dashboard(request, guild_id):
    return HttpResponse(f"Dashboard of the guild {guild_id}")
