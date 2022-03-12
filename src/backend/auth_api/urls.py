from django.urls import path
from . import views


urlpatterns = [
    path('api/auth', views.get_routes),
    path('api/auth/signup', views.sign_up),
    path('api/auth/token', views.get_routes_token),
    path('api/auth/token/get', views.get_auth_token),
    path('api/auth/token/resolve', views.resolve_auth_token),
]
