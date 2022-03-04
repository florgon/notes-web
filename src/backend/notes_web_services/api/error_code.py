from enum import Enum

class ApiErrorCode(Enum):
    """API Standartized error codes. """

    # Auth releated.
    AUTH_REQUIRED = 0, 401

    # Non existance releated.
    NOTE_NOT_EXISTS = 10, 404

    # API fields releated.
    API_FIELD_REQUIRED = 20, 400
    API_FIELD_INVALID = 21, 400

    # Privacy releate.
    PRIVACY_PRIVATE_NOTE = 30, 403

    # Other.
    NOT_IMPLEMENTED = 50, 501