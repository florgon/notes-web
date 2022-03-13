from django.contrib.auth.models import User

def user_username_taken(username: str) -> bool:
    """ Returns is given username already taken or not. """
    if User.objects.filter(username=username).exists():
        return True
    
    return False

def user_email_taken(email: str) -> bool:
    """ Returns is given email already taken or not. """
    if User.objects.filter(email=email).exists():
        return True
    
    return False
