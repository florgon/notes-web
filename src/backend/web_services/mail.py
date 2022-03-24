from django.core.mail import send_mail
from django.conf import settings

def send_signup_message(email: str, username: str):
    """Sends welcome signup message to an email."""
    subject = "Registration on Notes"
    message = f"Hello, {username}! Welcome on Notes!"

    return send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )