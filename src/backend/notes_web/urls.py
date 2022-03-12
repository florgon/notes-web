from django.conf.urls import handler400
from django.contrib import admin
from django.urls import path, include
from . import views

handler404 = views.handler404
handler500 = views.handler500

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.get_routes_api),
    path('', views.get_routes),
    path('', include('notes_api.urls')),
    path('', include('auth_api.urls'))
]