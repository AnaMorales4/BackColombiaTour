# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim AS base

COPY . /app
WORKDIR /app

RUN npm install
RUN node ace build --ignore-ts-errors

RUN cp .env.example build/.env
RUN cp .env.example .env

RUN mkdir -p build/docs && cp -r docs/* build/docs/

WORKDIR /app/build

RUN npm ci --production
RUN node ace generate:key

#variables de entorno
ENV NODE_ENV=production

EXPOSE 3333
CMD ["node", "bin/server.js"]