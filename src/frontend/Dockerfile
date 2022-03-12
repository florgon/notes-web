# syntax=docker/dockerfile:1
FROM node:17-alpine3.14

WORKDIR /web/notes

ENV PATH /web/notes/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install npm@latest -g --silent
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . /web/notes/

RUN npm run build