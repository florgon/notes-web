from rest_framework.decorators import api_view

from web_services.api.error_code import ApiErrorCode
from web_services import crud
from web_services.utils import (
    try_convert_type, validate_request
)
from web_services.api.response import (
    api_error, api_success
)


@api_view(["GET"])
def get_note(request):
    """ Returns information about specific note by it`s ID. """

    # Validate request.
    is_valid, fields_or_error = validate_request(request, fields=["id"], auth_required=True)
    if not is_valid:
        return fields_or_error
    note_id, = fields_or_error

    # Validating note index value.
    note_id = try_convert_type(note_id, type=int)
    if note_id is None or note_id < 0:
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`id` field has invalid format, expected a number!", {"field": "id"})
    
    # Query note from CRUD API.
    note = crud.notes.get_note_by_id(note_id)
    if not note:
        return api_error(ApiErrorCode.NOTE_NOT_EXISTS, "Note not found!")

    # Check privacy.
    if not crud.notes.user_is_note_author(note, request.user):
        return api_error(ApiErrorCode.PRIVACY_PRIVATE_NOTE, "You are not allowed to view this note.", {"description": "This note belongs to another user, which you dont have access to by privacy reasons!"})

    # Returning OK.
    return api_success(note.to_api_dict())


@api_view(["GET"])
def delete_note(request):
    """ Deletes specific note by it`s ID and returns information about it. """

    # Validate request.
    is_valid, fields_or_error = validate_request(request, fields=["id"], auth_required=True)
    if not is_valid:
        return fields_or_error
    note_id, = fields_or_error

    # Validate note index value.
    note_id = try_convert_type(note_id, type=int)
    if note_id is None or note_id < 0:
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`id` field has invalid format, expected a number!", {"field": "id"})
    
    # Query note from CRUD API.
    note = crud.notes.get_note_by_id(note_id)
    if not note:
        return api_error(ApiErrorCode.NOTE_NOT_EXISTS, "Note not found!")

    # Checking privacy.
    if not crud.notes.user_is_note_author(note, request.user):
        return api_error(ApiErrorCode.PRIVACY_PRIVATE_NOTE, "You are not allowed to delete this note.", {"description": "This note belongs to another user, which you dont have access to by privacy reasons!"})

    # Save note dict before delete request.
    note_dict = note.to_api_dict()

    # Delete note.
    note.delete()

    # Returning OK with deleted note data.
    return api_success(note_dict)


@api_view(["GET"])
def edit_note(request):
    """ Updates information for specific note by it`s ID and given new information. Also returns information about it after editing. """

    # Validating request.
    is_valid, fields_or_error = validate_request(request, fields=["id", "text"], auth_required=True)
    if not is_valid:
        return fields_or_error
    note_id, text = fields_or_error

    # Validating note index value.
    note_id = try_convert_type(note_id, type=int)
    if note_id is None or note_id < 0:
        return api_error(ApiErrorCode.API_FIELD_INVALID, "`id` field has invalid format, expected a number!", {"field": "id"})
    
    # Query note from CRUD API.
    note = crud.notes.get_note_by_id(note_id)
    if not note:
        return api_error(ApiErrorCode.NOTE_NOT_EXISTS, "Note not found!")

    # Check privacy.
    if not crud.notes.user_is_note_author(note, request.user):
        return api_error(ApiErrorCode.PRIVACY_PRIVATE_NOTE, "You are not allowed to edit this note.", {"description": "This note belongs to another user, which you dont have access to by privacy reasons!"})

    # Edit note.
    note.text = text
    note.save()

    # Returning OK.
    return api_success(note.to_api_dict())


@api_view(["GET"])
def create_note(request):
    """ Creates new note with given parameters and returns information about it. """
    
    # Validating request.
    is_valid, fields_or_error = validate_request(request, fields=["text"], auth_required=True)
    if not is_valid:
        return fields_or_error
    text, = fields_or_error
   
    # Returning note from CRUD API.
    note = crud.notes.create_note(text, request.user)
    return api_success(note.to_api_dict())


@api_view(["GET"])
def list_notes(request):
    """ Returns a list with notes (with information) of current authenticated user. """

    # Validating request.
    is_valid, fields_or_error = validate_request(request, auth_required=True)
    if not is_valid:
        return fields_or_error

    # Returning notes from CRUD API.
    notes = crud.notes.get_notes_from_user(request.user.id)
    return api_success({
        "notes": [note.to_api_dict() for note in notes]
    })


@api_view(["GET"])
def get_notes_counters(request):
    """ Returns counters (numbers) for notes data (like total notes count). """

    # Validating request.
    is_valid, fields_or_error = validate_request(request, auth_required=True)
    if not is_valid:
        return fields_or_error

    # Returning counters from CRUD API.
    notes_count = crud.notes.get_notes_count_for_user()
    return api_success({
        "counters": {"notes": {"total": notes_count}}
    })