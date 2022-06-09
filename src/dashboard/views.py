from django.http import HttpResponse
from django.shortcuts import render


def guild_list(request):
    return HttpResponse(f"List of the guilds")

def dashboard(request, guild_id):
    return HttpResponse(f"Dashboard of the guild {guild_id}")
