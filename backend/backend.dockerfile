# docker/backend.Dockerfile
FROM node:22.19-slim

WORKDIR /app

# Installer les dépendances
COPY backend/package*.json ./
RUN npm install

# Copier tout le backend
COPY backend ./

# Exposer le port Nest
EXPOSE 3000

# Lancer en mode dev (hot reload)
CMD ["npm", "run", "start:dev"]
