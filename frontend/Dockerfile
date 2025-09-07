# frontend/Dockerfile

# Etapa 1: Construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Variables de entorno para build
ARG VITE_API_URL=http://localhost:8080
ARG VITE_APP_ENV=production
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_ENV=$VITE_APP_ENV

# Construir aplicación para producción
RUN pnpm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Instalar gettext para envsubst
RUN apk add --no-cache gettext

# Remover configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración de nginx como template
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Copiar archivos build desde etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Script de entrypoint para variables dinámicas
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Exponer puerto
EXPOSE 80

# Variables de entorno por defecto
ENV API_URL=http://backend:8080

# Usar entrypoint personalizado
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]