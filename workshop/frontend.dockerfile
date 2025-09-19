# workshop/Dockerfile
FROM node:22.19-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=4200
ENV HOST=0.0.0.0

EXPOSE 4200

CMD ["npm", "start"]