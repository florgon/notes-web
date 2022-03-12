from typing import Any, Callable
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError

def validate_email(email: str) -> bool:
    try:
        django_validate_email(email)
        return True
    except ValidationError:
        return False

def try_convert_type(value: Any, *, type: Callable = int, default: Any=None) -> Any:
    """ Convert value to a given type or returns default value. """
    try:
        return type(value)
    except ValueError:
        return default
