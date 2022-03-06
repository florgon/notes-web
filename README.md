# Notes taking website.
### [Try it!](http://notes.kirillzhosul.site) / [But how to run?](#how-to-run)

# Description
This is monorepository with notes website, with API and Frontend servers.
Website provides simple web interface for creating *private* user notes and working with them.
Project uses Python (Django, REST API) + React (SPA Frontend) + Docker (Compose).
This is test task for *SimbirSoft* (Web/Backend).

# Previews.
![Home page](/previews/home.png)
![Notes list page](/previews/list.png)

# API Methods.
See `API_METHODS.md`

# Specification.
See `SPECIFICATION.md`

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
