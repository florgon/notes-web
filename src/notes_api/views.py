from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(["GET"])
def get_note(request):
    """ Returns information about specific note by it`s ID. """
    return Response({"error": "Current API method is not implemented yet."}, status=501)


@api_view(["GET"])
def delete_note(request):
    """ Deletes specific note by it`s ID and returns information about it. """
    return JsonResponse({"error": "Current API method is not implemented yet."}, status=501)


@api_view(["GET"])
def edit_note(request):
    """ Updates information for specific note by it`s ID and given new information. Also returns information about it after editing. """
    return JsonResponse({"error": "Current API method is not implemented yet."}, status=501)


@api_view(["GET"])
def create_note(request):
    """ Creates new note with given parameters and returns information about it. """
    return JsonResponse({"error": "Current API method is not implemented yet."}, status=501)


@api_view(["GET"])
def list_notes(request):
    """ Returns a list with notes (with information) of current authenticated user. """
    return JsonResponse({"error": "Current API method is not implemented yet."}, status=501)


@api_view(["GET"])
def get_notes_counters(request):
    """ Returns counters (numbers) for notes data (like total notes count). """
    return JsonResponse({"error": "Current API method is not implemented yet."}, status=501)