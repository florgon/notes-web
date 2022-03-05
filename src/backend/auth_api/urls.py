from django.urls import path
from . import views


urlpatterns = [
    path('api/auth/token/get', views.get_auth_token),
    path('api/auth/token/resolve', views.resolve_auth_token),
]