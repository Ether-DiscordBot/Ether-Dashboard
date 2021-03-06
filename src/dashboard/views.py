from django.http import Http404, HttpResponse
from django.shortcuts import redirect, render
from asgiref.sync import async_to_sync

from oauth2.functions import get_access_token, get_user, get_guilds
from oauth2.db.client import Database

min_permission = 4398046511103

@async_to_sync
async def guild_list(request):
    token = get_access_token(request)
    if not token:
        redirect('/oauth2/login')
        
    all_guilds = get_guilds(token)
    guilds = [g for g in all_guilds if int(g['permissions']) >= min_permission]
    
    for guild in guilds:
        db_guilds = await Database.Guild.get_or_none(int(guild['id']))
        
        if db_guilds:
            guild['setup'] = True
            
    user_context = get_user(token)
    user_context['connected'] = True

    context = {
        "title": "Dashboard",
        "user": user_context,
        "guilds": guilds
    }
    return render(request, "dashboard/guild_list.html", context=context)

@async_to_sync
async def guild_dashboard(request, guild_id):
    token = get_access_token(request)
    all_guilds = get_guilds(token)
    guilds = [g for g in all_guilds if int(g['permissions']) >= min_permission]

    for guild in guilds:
        if int(guild['id']) == guild_id:
            db_guild = await Database.Guild.get_or_create(int(guild['id']))
            user_context = get_user(token)
            user_context['connected'] = True

            context = {
                "title": "Dashboard",
                "user": user_context,
                "guild": guild,
                "db_guild": db_guild,
                "test_function": test_function
            }
            return render(request, "dashboard/guild_dashboard.html", context=context)
    raise Http404("Server not found!")

def test_function():
    print("Hello World!")