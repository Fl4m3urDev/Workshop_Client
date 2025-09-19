# docker/backend.Dockerfile
FROM node:22.19-slim

WORKDIR /app

# Installer openssl
RUN apt-get update -y && apt-get install -y openssl

# Installer les dépendances
COPY ./package*.json ./

RUN npm install

COPY ./prisma ./prisma

RUN npx prisma generate

# Copier tout le backend
COPY ./ ./

# Exposer le port Nest
EXPOSE 3000

# Lancer en mode dev (hot reload)
CMD ["npm", "run", "start:dev"]
