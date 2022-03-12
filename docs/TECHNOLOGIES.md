# Project used technologies.

### Core.
Backend: Python3 and Django as web-framework for API.
Frontend: React SPA (Boostrap, i18next, etc.).
Database: PostgreSQL.
Utils: Docker (compose).

# Proxy (Nginx).
Project will not use for now Nginx in containerization.
Please supply Nginx proxy by own.

### Database.
Project uses PostgreSQL as database. Database located at `database` docker container.

### Backend.
Project uses Django with Python3 as backend API that is run under Gunicorn as WSGI server.
You may use native Django server in development.

### Frontend.
Project uses React SPA frontend that works in AJAX with API from backend.
Design uses HTML + Boostrap. For translation there is i18next module.

### Docker environment.
Project uses alpine as core (for Python and NodeJS).
There is 3 containers: `database`, `frontend`, `backend`
Ports: 3000 (Frontend), 8000 (Backend), 5432 (PostgreSQL)
Project is not have nginx under docker, you should deploy it by own.