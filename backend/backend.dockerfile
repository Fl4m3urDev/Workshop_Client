# docker/backend.Dockerfile
FROM node:22.19-slim

WORKDIR /app

ENV DATABASE_URL=mysql://root:rootpassword@mysql:3306/projetdb

# Installer openssl
RUN apt-get update -y && apt-get install -y openssl

# Installer les dépendances
COPY ./package*.json ./

RUN npm install

COPY ./prisma ./prisma

RUN npx prisma generate
RUN npx prisma db push
RUN npx prisma db seed

# Copier tout le backend
COPY ./ ./

# Exposer le port Nest
EXPOSE 3000

# Lancer en mode dev (hot reload)
CMD ["npm", "run", "start:dev"]
