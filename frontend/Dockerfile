FROM nginx:1.25.3-alpine
ARG BUILD_FOLDER

COPY ./nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY ./dist/${BUILD_FOLDER}/browser /usr/share/nginx/html/
