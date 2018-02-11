FROM nginx:alpine

LABEL MAINTAINER Emmanuel Gautier <docker@emmanuelgautier.fr>

ENV NGINX_HOST www.emmanuelgautier.fr
ENV NGINX_PORT 80

COPY . /usr/share/nginx/html

EXPOSE 80 443
