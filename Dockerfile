FROM node:14.17-alpine3.11 as build-stage

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

RUN npm run build

