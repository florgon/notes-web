from rest_framework.decorators import api_view

from web_services.api.error_code import ApiErrorCode
from web_services.api.response import (
    api_error, api_success
)
from web_services.crud.notes import (
    get_notes_from_user, 
    get_notes_count_for_user,
    get_note_by_id,
    user_is_note_author
)
from web_services.utils import (
    try_convert_type
)


@api_view(["GET"])
def get_routes(_):
    """Returns list of all routes releated to this API."""
    routes = [
        "/get", "/delete",
        "/edit", "/create",
        "/list", "/counters",
    ]
    return api_success({"methods": {"api": {"notes": routes}}})


@api_view(["GET"])
def get_note(request):
    """ Returns information about specific note by it`s ID. """
    if not request.user.is_authenticated:
        return api_error(ApiErrorCode.AUTH_REQUIRED, "Authentication required!")

    note_id = request.GET.get("id", "")
    if not note_id:
        return api_error(ApiErrorCode.API_FIELD_REQUIRED, "`id ` field is required!", {"field": "id"})
            
    note_id = try_convert_type(note_id, type=int)
    if note_id is None or note_id < 0:
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`id` field has invalid format, expected a number!", {"field": "id"})
    
    note = get_note_by_id(note_id)
    if not note:
        return api_error(ApiErrorCode.NOTE_NOT_EXISTS, "Note not found!")

    if not user_is_note_author(note, request.user):
        return api_error(ApiErrorCode.PRIVACY_PRIVATE_NOTE, "You are not allowed to view this note.", {"description": "This note belongs to another user, which you dont have access to by privacy reasons!"})

    return api_success(note.to_api_dict())


@api_view(["GET"])
def delete_note(request):
    """ Deletes specific note by it`s ID and returns information about it. """
    if not request.user.is_authenticated:
       return api_error(ApiErrorCode.AUTH_REQUIRED, "Authentication required!")

    return api_error(ApiErrorCode.AUTH_REQUIRED, "This API method is not implemented yet!")


@api_view(["GET"])
def edit_note(request):
    """ Updates information for specific note by it`s ID and given new information. Also returns information about it after editing. """
    if not request.user.is_authenticated:
       return api_error(ApiErrorCode.AUTH_REQUIRED, "Authentication required!")

    return api_error(ApiErrorCode.AUTH_REQUIRED, "This API method is not implemented yet!")


@api_view(["GET"])
def create_note(request):
    """ Creates new note with given parameters and returns information about it. """
    if not request.user.is_authenticated:
       return api_error(ApiErrorCode.AUTH_REQUIRED, "Authentication required!")

    return api_error(ApiErrorCode.AUTH_REQUIRED, "This API method is not implemented yet!")


@api_view(["GET"])
def list_notes(request):
    """ Returns a list with notes (with information) of current authenticated user. """
    if not request.user.is_authenticated:
        return api_error(ApiErrorCode.AUTH_REQUIRED, "Authentication required!")
    notes = get_notes_from_user(request.user.id)
    return api_success({
        "notes": [note.to_api_dict() for note in notes]
    })


@api_view(["GET"])
def get_notes_counters(request):
    """ Returns counters (numbers) for notes data (like total notes count). """
    if not request.user.is_authenticated:
        return api_error(ApiErrorCode.AUTH_REQUIRED, "Authentication required!")

    notes_count = get_notes_count_for_user()
    return api_success({
        "counters": {"notes": {"total": notes_count}}
    })