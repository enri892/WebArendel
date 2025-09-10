#!/bin/sh
# frontend/docker-entrypoint.sh

# Sustituir variables de entorno en la configuración de nginx
envsubst '${API_URL}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Ejecutar comando pasado como argumento
exec "$@"