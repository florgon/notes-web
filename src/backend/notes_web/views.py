from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token


from web_services.api.response import (
    api_success, api_error
)
from web_services.api.error_code import ApiErrorCode

@api_view(["GET"])
def get_routes_api(_):
    """Returns list of all routes releated to this app APIs."""
    routes = [
        "/notes/",
        "/auth/"
    ]
    return api_success({"methods": {"api": routes}})

@api_view(["GET"])
def get_routes(_):
    """Returns list of all routes releated to this app APIs."""
    routes = [
        "/api/"
    ]
    return api_success({"methods": routes})

@api_view(["GET"])
def handler404(*args, **kwargs):
    return api_error(ApiErrorCode.API_METHOD_NOT_FOUND, "Requested method does not exists.")
    

@api_view(["GET"])
def handler500(_):
    return api_error(ApiErrorCode.SERVER_IS_DOWN, "Internal server error.")