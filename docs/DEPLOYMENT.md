# How to deploy project on production server.

## Nginx proxy.
Install `nginx` and setup proxying:
#### Frontend.
In your `/etc/nginx/nginx.conf` add new server configuration:
```
server {
        server_name [YOUR_DOMAIN];
        index index.html;
        root /[PROJECT_PATH]/src/frontend/build;
}
```
this will set file proxy to the build directory in project frontend directory.
#### Backend.
In your `/etc/nginx/nginx.conf` add new server configuration:
```
server {
        server_name [YOUR_DOMAIN];
        location /api {
                proxy_pass http://127.0.0.1:[YOUR_PORT];
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
```
this will set proxy for backend server.

## Configuring.
#### Frontend.
Frontend config values may be changed in `/src/frontend/.env` file. If you are using Nginx proxy, you should change API_URL.
#### Backend.
Almost all backend settings located in `/src/docker-compose.yml` file in backend service environment.

## Bulding and running.
Install `docker-compose`, then clone this repository, and run all containers via:
```commandLine
docker-compose up
```
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
python manage.py migrate [CTRL+D]
```
And optionally, create superuser:
```commandLine
python manage.py createsuperuser [CTRL+D]
```