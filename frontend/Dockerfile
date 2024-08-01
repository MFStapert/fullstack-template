FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.25.3-alpine

COPY ./nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build ./app/dist/browser /usr/share/nginx/html/
