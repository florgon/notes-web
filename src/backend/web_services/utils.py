from typing import Any, Callable


def try_convert_type(value: Any, *, type: Callable = int, default: Any=None) -> Any:
    """ Convert value to a given type or returns default value. """
    try:
        return type(value)
    except ValueError:
        return default