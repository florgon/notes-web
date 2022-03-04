from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    """Note model repesenting core Note entity, Notes by default should contain body (text), author index, and create / update time. """

    text = models.TextField(null=False, blank=True, verbose_name="Text", help_text="Note body as text string.")

    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="Updated at", help_text="Time when note last update was.")
    created_at = models.DateTimeField(auto_now=True, verbose_name="Created at", help_text="Time when note was created.")

    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Author user", help_text="User who created the note.")

    def to_api_dict(self) -> dict:
        """ Returns note as API response dictionary. """
        return {
            "note": {
                "id": self.id,
                "text": self.text,
                "updated_at": self.updated_at,
                "created_at": self.created_at,
                "author_id": self.author.id
            }
        }