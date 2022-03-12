from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from web_services.api.response import (
    api_success, api_error
)
from web_services.utils import validate_email
from web_services.api.error_code import ApiErrorCode

@api_view(["GET"])
def get_routes(_):
    """Returns list of all routes releated to this API."""
    routes = [
        "/token/",
        "/signup",
    ]
    return api_success({"methods": {"api": {"auth": routes}}})

@api_view(["GET"])
def get_routes_token(_):
    """Returns list of all routes releated to this API for token."""
    routes = [
        "/get", "/resolve"
    ]
    return api_success({"methods": {"api": {"auth": {"token": routes}}}})

@api_view(["GET"])
def sign_up(request):
    """Register new account for user. """
    username = request.GET.get("username", "")
    email = request.GET.get("email", "")
    password = request.GET.get("password", "")
    password_confirmation = request.GET.get("password_confirmation", "")

    if not username:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`username` field is required!", {"field": "username"})
    if len(username) < 4:
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`username` field has invalid format, too short!", {"field": "username"})
    if username != username.lower():
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`username` field has invalid format, only lowercase!", {"field": "username"})

    if not email:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`email` field is required!", {"field": "email"})
    if not validate_email(email):
        return api_error(ApiErrorCode.API_FIELD_INVALID, f"`email` field has invalid format, email invalid! {email}", {"field": "email"})

    if not password:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`password` field is required!", {"field": "password"})
    if not password_confirmation:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`password_confirmation` field is required!", {"field": "password_confirmation"})
    if password != password_confirmation:
        return api_error(ApiErrorCode.AUTH_PASSWORDS_NOT_SAME, "Password and it`s confirmation not the same!")
    if len(password) < 8:
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`password` field has invalid format, too short!", {"field": "password"})

    user = User.objects.create_user(username, email, password)
    token, is_new = Token.objects.get_or_create(user=user)
    return api_success({
        "token": {
            "key": token.key,
            "is_new": is_new
        },
        "user_id": user.id
    })
    

@api_view(["GET"])
def resolve_auth_token(request):
    """Returns information about token (user, actually). Resolving token. """
    key = request.GET.get("token", "")
    if not key:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`token` field is required!", {"field": "token"})

    try:  # This is bad, should move away later.
        token = Token.objects.select_related('user').get(key=key)
    except Token.DoesNotExist:
        return api_error(ApiErrorCode.AUTH_INVALID_CREDENTIALS, "Token does not exist.")

    if not token.user.is_active:
        return api_error(ApiErrorCode.AUTH_INVALID_CREDENTIALS, "Owner of this token is not active or deleted!")

    return api_success({"token": {
        "key": key,
        "user": {
            "id": token.user.id,
            "username": token.user.username
        }
    }})

@api_view(["GET"])
def get_auth_token(request):
    """Returns authentication token by given username and password pair. Used as auth endpoint. """
    username = request.GET.get("username", "")
    if not username:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`username` field is required!", {"field": "username"})

    password = request.GET.get("password", "")
    if not password:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`password` field is required!", {"field": "password"})

    user = authenticate(request=request, username=username, password=password)
    if not user:
        return  api_error(ApiErrorCode.AUTH_INVALID_CREDENTIALS, "Invalid credentials to autheticate!")

    token, is_new = Token.objects.get_or_create(user=user)
    if not token:
         return api_error(ApiErrorCode.AUTH_INVALID_CREDENTIALS, "Failed to created token!")

    return api_success({
        "token": {
            'key': token.key,
            'is_new': is_new
        },
        'user_id': user.id
    })