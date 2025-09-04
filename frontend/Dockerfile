# Build stage
FROM node:18-alpine as build

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production stage - SIN nginx personalizado
FROM nginx:alpine

# Solo copia los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Usa la configuración por defecto de nginx (funciona con React)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]