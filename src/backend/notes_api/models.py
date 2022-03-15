from typing import NoReturn
from datetime import datetime

from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    """Note model repesenting core Note entity, Notes by default should contain body (text), author index, and create / update time. """

    # Body of the note.
    text = models.TextField(null=False, blank=True, verbose_name="Text", help_text="Note body as text string.")

    # Dates (auto updated).
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="Updated at", help_text="Time when note last update was.")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at", help_text="Time when note was created.")

    # ID of the author for privacy checks and listing.
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Author user", help_text="User who created the note.")

    # Is note pinned at the top or not.
    is_pinned = models.BooleanField(null=False, default=False, verbose_name="Is pinned", help_text="Is note pinned at the top of the notes list.")

    def to_api_dict(self) -> dict:
        """ Returns note as API response dictionary. """
        return {
            "note": {
                "id": self.id,
                "text": self.text,
                "updated_at": self.updated_at,
                "created_at": self.created_at,
                "author_id": self.author.id,
                "sorting": {
                    "is_pinned": self.is_pinned
                }
            }
        }

    def update_text(self, new_text: str) -> NoReturn:
        """ Updates note text with updating updated time. """
        self.text = new_text
        self.updated_at = datetime.now()