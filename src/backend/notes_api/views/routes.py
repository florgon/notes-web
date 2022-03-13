from rest_framework.decorators import api_view

from web_services.api.response import api_success


@api_view(["GET"])
def get_routes(_):
    """ Returns list of all routes releated to this API. """
    routes = [
        "/get", "/delete",
        "/edit", "/create",
        "/list", "/counters",
    ]
    return api_success({"methods": {"api": {"notes": routes}}})
