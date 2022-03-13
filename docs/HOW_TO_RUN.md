# How to run project.
Install `docker-compose`, then clone this repository, and run all containers via:
```commandLine
docker-compose up
```
This will automatically install containers, run database (PostgreSQL),  Django with Gunicorn WSGI server and React frontend with Node.
#### Important! If this is your first time running project:
Django may fall for first time (only 1 time on first run), you should create PSQL database and apply migrations by:
(Note: `docker container ls` to get containers indeces!)
Creating database table:
```commandLine
docker exec -it DATABASE_CONTAINER_ID /bin/sh
psql -U postgres
CREATE DATABASE notes;
\q [CTRL+D]
```
Making migrations:
```commandLine
docker exec -it WEB_CONTAINER_ID /bin/sh
python manage.py makemigrations *
python manage.py migrate [CTRL+D]
```
And optionally, create superuser:
```commandLine
python manage.py createsuperuser [CTRL+D]
```