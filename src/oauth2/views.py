from django.http import HttpRequest, JsonResponse
from django.shortcuts import redirect

from .functions import exchange_code, get_user, get_guilds

auth_url = "https://discord.com/api/oauth2/authorize?client_id=985100792270819389&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Foauth2%2Fredirect&response_type=code&scope=identify%20guilds"

def login(request):
    return redirect(auth_url)

def discord_redirect(request: HttpRequest):
    code = request.GET.get('code')
    authorization = exchange_code(code)
    
    response =  redirect("/")
    response.set_cookie('__cfduid', authorization['token'], max_age=authorization['expires'])
    return response

