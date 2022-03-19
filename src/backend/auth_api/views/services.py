import requests
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.http import HttpResponseRedirect
from django.conf import settings

from web_services import crud
from web_services.api.error_code import ApiErrorCode
from web_services.api.response import (
    api_success,
    api_error
)
from web_services.utils import (
    validate_request
)


# URLs.
VK_SERVICE_AUTH_REDIRECT_URL = "https://oauth.vk.com/oauth/authorize"
VK_SERVICE_AUTH_VERIFY_URL = "https://oauth.vk.com/access_token"
VK_SERVICE_AUTH_FINAL_URL = f"{settings.FRONTEND_DOMAIN}/auth/login"


def validate_service_response(error: str, description: str, is_external: bool):
    """ Validates service response for any errors."""
    if error or description:
        if is_external:
            return False, HttpResponseRedirect(redirect_to=f"{VK_SERVICE_AUTH_FINAL_URL}?error=service&service_error={error}&service_description={description}")
        return False, api_error(ApiErrorCode.AUTH_SERVICE_ERROR, "Failed to authorize via service provider!", {
            "service_error": error,
            "service_error_description": description
        })
    return True, None


def _error_unavaliable(is_external: bool):
    """Returns service unaviable error."""
    if is_external:
        return HttpResponseRedirect(redirect_to=f"{VK_SERVICE_AUTH_FINAL_URL}?error=unavaliable")
    return api_error(ApiErrorCode.AUTH_SERVICE_ERROR, "Authorization service is unavaliable, or inproperly configured by administrators!")
    

@api_view(["GET"])
def vk_request_auth(request):
    """Requests auth from VK service, by returning URL to redirect, or redirecting if passed `state=external` in GET."""

    # Validate request.
    is_valid, fields_or_error = validate_request(request, fields=["state"], auth_required=False)
    if not is_valid:
        return fields_or_error
    state,  = fields_or_error
    is_external = (state == "external")

    # Check setup.
    if settings.AUTH_SERVICE_VK_CLIENT_ID is None:
        _error_unavaliable()

    # Provider URL.
    service_redirect_uri = f"{request.scheme}://{request.get_host()}/api/auth/service/vk/callback"
    auth_provider_url = f"{VK_SERVICE_AUTH_REDIRECT_URL}?client_id={settings.AUTH_SERVICE_VK_CLIENT_ID}&redirect_uri={service_redirect_uri}&state={state}&scope=0&display=page&response_type=code&v=5.131"

    # Returning redirect or just URL JSON.
    if is_external:
        return HttpResponseRedirect(redirect_to=auth_provider_url)
    return api_success({"auth_provider_url": auth_provider_url})


@api_view(["GET"])
def vk_callback_auth(request):
    """Callback from VK auth service."""

    # Validate request.
    is_valid, fields_or_error = validate_request(request, fields=["state", "code"], auth_required=False)
    if not is_valid:
        return fields_or_error
    state, code  = fields_or_error
    is_external = (state == "external")

    # Validate service.
    is_valid, validation_error = validate_service_response(request.GET.get("error"), request.GET.get("error_description"), is_external)
    if not is_valid:
        return validation_error

    # Check setup.
    if settings.AUTH_SERVICE_VK_CLIENT_ID is None or settings.AUTH_SERVICE_VK_CLIENT_SECRET is None:
        _error_unavaliable(is_external)

    # Request service.
    service_redirect_uri = f"{request.scheme}://{request.get_host()}/api/auth/service/vk/callback"
    auth_request = requests.get(VK_SERVICE_AUTH_VERIFY_URL, {
        "client_id": settings.AUTH_SERVICE_VK_CLIENT_ID,
        "client_secret": settings.AUTH_SERVICE_VK_CLIENT_SECRET,
        "redirect_uri": service_redirect_uri,
        "code": code
    }).json()

    # Validate service.
    is_valid, validation_error = validate_service_response(auth_request.get("error"), auth_request.get("error_description"), is_external)
    if not is_valid:
        return validation_error

    # Check user index.
    user_id = auth_request.get("user_id")
    if not user_id:
        if is_external:
            return HttpResponseRedirect(redirect_to=f"{VK_SERVICE_AUTH_FINAL_URL}?error=unknown")
        return api_error(ApiErrorCode.AUTH_SERVICE_ERROR, "Failed to authorize via service provider! Service not returned required information!")

    # Query user.
    user = crud.user.get_user_by_vk_user_id(user_id)
    if not user:
        if is_external:
            return HttpResponseRedirect(redirect_to=f"{VK_SERVICE_AUTH_FINAL_URL}?error=no-connected-user")
        return api_error(ApiErrorCode.AUTH_INVALID_CREDENTIALS, "Failed to get user!")
    
    # Try query token.
    token, is_new = Token.objects.get_or_create(user=user)
    if not token:
        if is_external:
            return HttpResponseRedirect(redirect_to=f"{VK_SERVICE_AUTH_FINAL_URL}?error=unknown")
        return api_error(ApiErrorCode.AUTH_INVALID_CREDENTIALS, "Failed to create new token!")

    # Return success.
    if is_external:
        return HttpResponseRedirect(redirect_to=f"{VK_SERVICE_AUTH_FINAL_URL}?token={token}")
    # Returning token.
    return api_success({
        "token": {
            'key': token.key,
            'is_new': is_new
        },
        'user_id': user.id
    })