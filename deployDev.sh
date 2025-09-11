#!/bin/bash
# deployLocal.sh - Script de despliegue para DESARROLLO LOCAL

set -e  # Salir si cualquier comando falla

echo "🛠️ Iniciando despliegue de DESARROLLO LOCAL - Arendel..."

# Verificar que existe .envDev
if [ ! -f .envDev ]; then
    echo "❌ Error: No se encontró el archivo .envDev"
    echo "💡 Crea el archivo .envDev con las variables de desarrollo"
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
    
    # Corregir DockerfileDev files
    for file in "backend/DockerfileDev" "frontend/DockerfileDev"; do
        if [ -f "$file" ]; then
            echo "   📝 Corrigiendo $file..."
            sed -i 's/\r$//' "$file"
            echo "   ✅ $file corregido"
        fi
    done
    
    # Corregir docker-composeDev.yml
    if [ -f "docker-composeDev.yml" ]; then
        echo "   📝 Corrigiendo docker-composeDev.yml..."
        sed -i 's/\r$//' "docker-composeDev.yml"
        echo "   ✅ docker-composeDev.yml corregido"
    fi
    
    echo "✅ Terminaciones de línea verificadas y corregidas"
}

# Función para build y deploy development
deploy() {
    echo "🔨 Construyendo imágenes para DESARROLLO..."
    
    # Build backend con DockerfileDev
    echo "📦 Construyendo backend (Spring Boot + Hot Reload)..."
    docker-compose -f docker-composeDev.yml build backend
    
    # Build frontend con DockerfileDev
    echo "🎨 Construyendo frontend (React + Vite Dev Server)..."
    docker-compose -f docker-composeDev.yml build frontend
    
    echo "🚀 Levantando servicios de DESARROLLO..."
    docker-compose -f docker-composeDev.yml --env-file .envDev up -d
    
    echo "⏳ Esperando que los servicios estén listos..."
    sleep 30
    
    # Verificar salud de los servicios
    echo "🔍 Verificando estado de los servicios..."
    
    # Check backend
    if curl -f http://localhost:8080/api/health > /dev/null 2>&1; then
        echo "✅ Backend: OK (http://localhost:8080)"
    else
        echo "⚠️ Backend: No disponible aún"
    fi
    
    # Check frontend
    if curl -f http://localhost:5173 > /dev/null 2>&1; then
        echo "✅ Frontend: OK (http://localhost:5173)"
    else
        echo "⚠️ Frontend: No disponible aún"
    fi
    
    echo ""
    echo "🎉 Despliegue de DESARROLLO completado!"
    echo "📱 Frontend: http://localhost:5173 (Vite Dev Server)"
    echo "🔧 Backend:  http://localhost:8080 (Spring Boot + Debug)"
    echo "🐛 Debug Port: localhost:5005"
    echo ""
    echo "📋 Para ver logs: docker-compose -f docker-composeDev.yml logs -f"
    echo "🛑 Para parar:   docker-compose -f docker-composeDev.yml down"
}

# Función para mostrar logs
logs() {
    docker-compose -f docker-composeDev.yml logs -f
}

# Función para parar servicios
stop() {
    echo "🛑 Parando servicios de desarrollo..."
    docker-compose -f docker-composeDev.yml down
    echo "✅ Servicios parados"
}

# Función para limpiar todo
clean() {
    echo "🧹 Limpiando todo (desarrollo)..."
    docker-compose -f docker-composeDev.yml down -v --rmi all
    docker system prune -f
    echo "✅ Limpieza completada"
}

# Función para recargar solo el frontend
reload_frontend() {
    echo "🔄 Recargando solo frontend..."
    docker-compose -f docker-composeDev.yml restart frontend
    echo "✅ Frontend recargado"
}

# Función para recargar solo el backend  
reload_backend() {
    echo "🔄 Recargando solo backend..."
    docker-compose -f docker-composeDev.yml restart backend
    echo "✅ Backend recargado"
}

# Verificar Docker
check_docker

# Procesar argumentos
case "${1:-deploy}" in
    "deploy")
        fix_line_endings
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
    "reload-frontend")
        reload_frontend
        ;;
    "reload-backend")
        reload_backend
        ;;
    *)
        echo "Uso: $0 [deploy|logs|stop|clean|restart|reload-frontend|reload-backend]"
        echo ""
        echo "Comandos para DESARROLLO LOCAL:"
        echo "  deploy         - Construir y desplegar para desarrollo (por defecto)"
        echo "  logs           - Ver logs en tiempo real"
        echo "  stop           - Parar servicios"
        echo "  clean          - Limpiar todo (imágenes, volúmenes, etc.)"
        echo "  restart        - Reiniciar servicios completos"
        echo "  reload-frontend - Recargar solo frontend (más rápido)"
        echo "  reload-backend  - Recargar solo backend (más rápido)"
        exit 1
        ;;
