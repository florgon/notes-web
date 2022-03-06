# Notes taking website.
This is monorepository with notes website, with API and Frontend servers.
Website provides simple web interface for creating *private* user notes and working with them.
Project uses Python (Django, REST API) + React (SPA Frontend) + Docker (Compose).
This is test task for *SimbirSoft* (Web/Backend).
### [Try it!](http://notes.kirillzhosul.site) (Open website with deployed version)
### [But how to run?](#how-to-run)

# API Methods.
Website backend API provides methods located under /api/:
- Auth
- - /api/auth/token/get
- - /api/auth/token/resolve
- Notes
- - /api/notes/create/
- - /api/notes/list/
- - /api/notes/get/
- - /api/notes/delete/
- - /api/notes/edit/

# Description.

### Website consists of these pages.
- Auth
- - Register (sign-up)
- - Login (sign-in)
- Notes
- - Take note
- - List notes
- Home
- - Home

### Menu.
Every page should contain menu with brand and these items:
- If not authenticated:
- - Home, Auth (Login / Register)
- If authenticated:
- - Home, Notes (List), Add note, Logout

### Auth.
- Registration (Sign-up)
- - Fields:
- - - Email
- - - Password
- - - Password confirmation
- - If user tries to register already registered email, this should be not allowed and user should get error message.
- - If user enters different passwords in "Password" and "Password confirmation", user should get error message.
- - After successfull registration, user should become authenticated and get access to pages with notes list and notes create page.
- Login (Sign-in)
- - Fields:
- - - Email
- - - Password
- - If there is any error with sign-in, error should shown to end-user.
### Notes.
- Notes list
- - Every note block on list should contain along with text also date and time when note was created.
- - Authenticated user should be allowed to see only own notes. (Not other user ones)
- Take note
- - Fields:
- - - Note text.
- - System should not allow to save empty notes. If user tries to save empty (blank) note, this should cause error that will shown to end-user.
- - Authenticated user should not be allowed to save notes under the guise of other user.
### Home.
- Message with overall user saved notes counter.



# How to run?
Install `Docker-Compose`, then clone this repository, and run all containers via:
```commandLine
docker-compose up
```
This will automatically install containers, run database (PostgreSQL),  Django with Gunicorn WSGI server and React frontend with Node.
#### Important! If this is your first time running project:
Django may fall for first time (only 1 time on first run), you should create PSQL database and apply migrations by:
Creating database table:
```commandLine
docker exec --it DATABASE_CONTAINER_ID /bin/sh
psql -U postgres
CREATE DATABASE notes;
\q [CTRL+D]
```
Making migrations:
```commandLine
docker exec --it WEB_CONTAINER_ID /bin/sh
python manage.py migrate [CTRL+D]
```
And optionally, create superuser:
```commandLine
python manage.py createsuperuser [CTRL+D]
```

# Technologies.

### Core.
Backend: Python3 and Django as web-framework for API.
Frontend: React SPA.
Database: PostgreSQL.
Utils: Docker (compose).

### Database.
Project uses PostgreSQL as database. Database located at `database` docker container.

### Backend.
Project uses Django with Python3 as backend API that is run under Gunicorn as WSGI server.
You may use native Django server in development.

### Frontend.
Project uses React SPA frontend that works in AJAX with API from backend.

### Docker environment.
Project uses alpine as core (for Python and NodeJS).
There is 3 containers: `database`, `frontend`, `backend`
Ports: 3000 (Frontend), 8000 (Backend), 5432 (PostgreSQL)
Project is not have nginx under docker, you should deploy it by own.

### Python requirements.
Requirements may be install via
```commandLine
pip install -r src/requirements.txt
```
or, if you want to contribute to project, install via
```commandLine
pip install -r src/requirements-dev.txt
```
