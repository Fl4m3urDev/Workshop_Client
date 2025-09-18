# docker/frontend.Dockerfile
FROM node:22.19-slim

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./

# Exposer le port Vite/CRA
EXPOSE 4200

# Lancer en mode dev
CMD ["npm", "start"]
