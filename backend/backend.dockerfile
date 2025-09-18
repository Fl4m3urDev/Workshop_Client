# backend/Dockerfile
FROM node:22.19-slim

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du backend
COPY . .

# Exposer le port Nest
EXPOSE 3000

# Lancer en dev
CMD ["npm", "run", "start:dev"]
