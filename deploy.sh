#!/bin/bash
# deploy.sh - Script de despliegue para Arendel

set -e  # Salir si cualquier comando falla

echo "🚀 Iniciando despliegue de Arendel..."

# Verificar que existe .env
if [ ! -f .env ]; then
    echo "❌ Error: No se encontró el archivo .env"
    echo "💡 Copia .env.example a .env y configura tus variables"
    exit 1
fi

# Función para verificar si Docker está corriendo
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Error: Docker no está corriendo"
        echo "💡 Inicia Docker e intenta de nuevo"
        exit 1
    fi
}

# Función para corregir terminaciones de línea
fix_line_endings() {
    echo "🔧 Verificando y corrigiendo terminaciones de línea..."
    
    # Corregir docker-entrypoint.sh si existe
    if [ -f "docker-entrypoint.sh" ]; then
        echo "   📝 Corrigiendo docker-entrypoint.sh..."
        sed -i 's/\r$//' docker-entrypoint.sh
        echo "   ✅ docker-entrypoint.sh corregido"
    fi
    
    # Corregir otros archivos críticos si existen
    for file in "nginx.conf.template" "Dockerfile" ".dockerignore"; do
        if [ -f "$file" ]; then
            echo "   📝 Corrigiendo $file..."
            sed -i 's/\r$//' "$file"
            echo "   ✅ $file corregido"
        fi
    done
    
    # Corregir archivos en directorios específicos
    if [ -d "frontend" ]; then
        find frontend -name "*.sh" -o -name "Dockerfile*" -o -name "*.conf*" | while read -r file; do
            if [ -f "$file" ]; then
                echo "   📝 Corrigiendo $file..."
                sed -i 's/\r$//' "$file"
            fi
        done
    fi
    
    if [ -d "backend" ]; then
        find backend -name "*.sh" -o -name "Dockerfile*" | while read -r file; do
            if [ -f "$file" ]; then
                echo "   📝 Corrigiendo $file..."
                sed -i 's/\r$//' "$file"
            fi
        done
    fi
    
    echo "✅ Terminaciones de línea verificadas y corregidas"
}

# Función para build y deploy
deploy() {
    echo "🔨 Construyendo imágenes..."
    
    # Build backend
    echo "📦 Construyendo backend (Spring Boot)..."
    docker-compose build backend
    
    # Build frontend  
    echo "🎨 Construyendo frontend (React + Nginx)..."
    docker-compose build frontend
    
    echo "🚀 Levantando servicios..."
    docker-compose up -d
    
    echo "⏳ Esperando que los servicios estén listos..."
    sleep 30
    
    # Verificar salud de los servicios
    echo "🔍 Verificando estado de los servicios..."
    
    # Check backend
    if curl -f http://localhost:8080/api/health > /dev/null 2>&1; then
        echo "✅ Backend: OK (http://localhost:8080)"
    else
        echo "⚠️  Backend: No disponible aún"
    fi
    
    # Check frontend
    if curl -f http://localhost:80/health > /dev/null 2>&1; then
        echo "✅ Frontend: OK (http://localhost)"
    else
        echo "⚠️  Frontend: No disponible aún"
    fi
    
    echo ""
    echo "🎉 Despliegue completado!"
    echo "📱 Frontend: http://localhost"
    echo "🔧 Backend:  http://localhost:8080"
    echo ""
    echo "📋 Para ver logs: docker-compose logs -f"
    echo "🛑 Para parar:   docker-compose down"
}

# Función para mostrar logs
logs() {
    docker-compose logs -f
}

# Función para parar servicios
stop() {
    echo "🛑 Parando servicios..."
    docker-compose down
    echo "✅ Servicios parados"
}

# Función para limpiar todo
clean() {
    echo "🧹 Limpiando todo..."
    docker-compose down -v --rmi all
    docker system prune -f
    echo "✅ Limpieza completada"
}

# Verificar Docker
check_docker

# Procesar argumentos
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "logs")
        logs
        ;;
    "stop")
        stop
        ;;
    "clean")
        clean
        ;;
    "restart")
        stop
        sleep 5
        deploy
        ;;
    *)
        echo "Uso: $0 [deploy|logs|stop|clean|restart]"
        echo ""
        echo "Comandos:"
        echo "  deploy   - Construir y desplegar (por defecto)"
        echo "  logs     - Ver logs en tiempo real"
        echo "  stop     - Parar servicios"
        echo "  clean    - Limpiar todo (imágenes, volúmenes, etc.)"
        echo "  restart  - Reiniciar servicios"
        exit 1
        ;;
esac