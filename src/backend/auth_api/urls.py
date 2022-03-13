from django.urls import path
from . import views


urlpatterns = [
    # Routes.
    path('api/auth', views.routes.get_routes),
    path('api/auth/token', views.routes.get_routes_token),
    # Auth.
    path('api/auth/signup', views.auth.sign_up),
    path('api/auth/token/get', views.auth.get_auth_token),
    path('api/auth/token/resolve', views.auth.resolve_auth_token),
]
