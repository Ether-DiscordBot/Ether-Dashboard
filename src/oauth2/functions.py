import os
from typing import Optional
from django.template import RequestContext
import requests

client_id = os.environ["CLIENT_ID"]
client_secret = os.environ["CLIENT_SECRET"]

def exchange_code(code: str):    
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://127.0.0.1:8000/oauth2/redirect",
        "scope": "identify guild",
    }
    
    headers = {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
    
    r = requests.post("https://discord.com/api/v10/oauth2/token", data=data, headers=headers)
    credentials = r.json()

    return {'token': credentials["access_token"], 'expires': credentials['expires_in']}

def get_access_token(request) -> Optional[str]:
    token = request.COOKIES.get('__cfduid')
    if not token:
        return None
    
    return token

def get_user(access_token):
    r = requests.get("https://discord.com/api/v10/users/@me", headers={
        'Authorization': 'Bearer %s' % access_token
    })
    
    user = r.json()
    return user

def get_guilds(access_token):
    r = requests.get("https://discord.com/api/v10/users/@me/guilds", headers={
        'Authorization': 'Bearer %s' % access_token
    })
    
    guild = r.json()
    return guild