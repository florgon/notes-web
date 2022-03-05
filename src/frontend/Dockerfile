# syntax=docker/dockerfile:1
FROM node:13.12.0-alpine

WORKDIR /web/notes

ENV PATH /web/notes/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . /web/notes/