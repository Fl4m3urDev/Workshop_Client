# docker/frontend.Dockerfile
FROM node:22.19-slim

WORKDIR /app

COPY ../workshop/package*.json ./
RUN npm install

COPY ../workshop ./

# Exposer le port Vite/CRA
EXPOSE 4200

# Lancer en mode dev
CMD ["npm", "start"]
