# WebArendel

```
arendel/
├── backend/
│   ├── Dockerfile              # 🚀 Producción
│   ├── DockerfileDev          # 🛠️ Desarrollo
│   └── src/main/resources/
│       ├── application.properties                    # Base
│       └── application-development.properties        # 🛠️ Dev específico
├── frontend/
│   ├── Dockerfile              # 🚀 Producción  
│   └── DockerfileDev          # 🛠️ Desarrollo
├── docker-compose.yml          # 🚀 Producción
├── docker-composeDev.yml      # 🛠️ Desarrollo
├── .env                        # 🚀 Producción
├── .envDev                     # 🛠️ Desarrollo
├── deploy.sh                   # 🚀 Script producción
├── deployLocal.sh             # 🛠️ Script desarrollo
└── README.md       # 📚 Esta guía
```
# 1. Build rápido
docker-compose -f docker-composeDev.yml build

# 2. Ejecutar
docker-compose -f docker-composeDev.yml --env-file .envDev up

# Para solo frontend:
docker-compose -f docker-composeDev.yml --env-file .envDev up frontend

# Para solo backend:
docker-compose -f docker-composeDev.yml --env-file .envDev up backend