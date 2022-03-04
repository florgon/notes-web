from django.urls import path
from . import views

urlpatterns = [
    # Methods for specific note.
    path('api/notes/get', views.get_note),
    path('api/notes/delete', views.delete_note),
    path('api/notes/edit', views.edit_note),

    # Other methods.
    path('api/notes/create', views.create_note),

    # Total notes information getters.
    path('api/notes', views.list_notes),
    path('api/notes/list', views.list_notes),
    path('api/notes/counters', views.get_notes_counters),
]
