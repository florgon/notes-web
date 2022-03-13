from django.urls import path

from . import views


urlpatterns = [
    # Routes.
    path('api/notes', views.routes.get_routes),

    # Methods for specific note.
    path('api/notes/get', views.notes.get_note),
    path('api/notes/delete', views.notes.delete_note),
    path('api/notes/edit', views.notes.edit_note),

    # Other methods.
    path('api/notes/create', views.notes.create_note),

    # Total notes information getters.
    path('api/notes/list', views.notes.list_notes),
    path('api/notes/counters', views.notes.get_notes_counters),
]
