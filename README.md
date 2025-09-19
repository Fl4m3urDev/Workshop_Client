# Workshop_Client

## 📌 Présentation

Ce projet est une application composée de deux parties principales :

* **Backend** : API développée avec [NestJS](https://nestjs.com/) (Node.js, TypeScript, Prisma).
* **Frontend** : Interface utilisateur développée avec [React](https://reactjs.org/).

L’infrastructure est gérée avec **Docker** et **docker-compose**, permettant un déploiement et une exécution simples et reproductibles.

---

## 🚀 Technologies utilisées

* **Backend** : NestJS, TypeScript, Prisma ORM
* **Frontend** : React, Node.js
* **Base de données** : via `init.sql` (adapter selon besoin : PostgreSQL, MySQL, etc.)
* **Docker** & **docker-compose** pour la conteneurisation

---

## 📂 Structure du projet

```
WORKSHOP_CLIENT/
├── backend/               # API NestJS
│   ├── prisma/            # Schéma & migrations
│   ├── src/               # Code source backend
│   ├── test/              # Tests backend
│   └── backend.Dockerfile # Dockerfile backend
│
├── workshop/              # Frontend React
│   ├── src/               # Code source React
│   ├── public/            # Fichiers publics React
│   ├── logs/              # Logs de l’application
│   ├── frontend.Dockerfile# Dockerfile frontend
│   ├── docker-compose.yml # Orchestration des conteneurs
│   └── init.sql           # Script d’initialisation DB
```

---

## ⚙️ Installation et exécution locale (sans Docker)

### 1️⃣ Prérequis

* [Node.js](https://nodejs.org/) >= 18.x
* [npm](https://www.npmjs.com/)

### 2️⃣ Installation des dépendances

#### Backend :

```bash
cd backend
npm install
```

#### Frontend :

```bash
cd workshop
npm install
```

### 3️⃣ Lancement en mode développement

#### Backend (NestJS) :

```bash
cd backend
npm run start:dev
```

#### Frontend (React) :

```bash
cd workshop
npm start
```

---

## 🐳 Exécution avec Docker

### 1️⃣ Construire et lancer les services

Depuis le dossier `workshop/` :

```bash
docker-compose up --build
```

### 2️⃣ Arrêter les conteneurs

```bash
docker-compose down --v
```

### 3️⃣ Accéder aux services

* **Frontend (React)** : [http://localhost:4200](http://localhost:4200)
* **Backend (NestJS API)** : [http://localhost:3000](http://localhost:3000)

---

## 🔧 Scripts utiles

### Backend (NestJS)

* `npm run start:dev` → lancer en mode développement
* `npm run build` → compiler le projet
* `npm run test` → exécuter les tests

### Frontend (React)

* `npm start` → lancer en développement
* `npm run build` → créer une version de production

---

## 📖 Notes

* Adapter les variables d’environnement dans `workshop/.env` et `backend/.env` si nécessaire.
* Vérifier la configuration de la base de données dans `init.sql` et Prisma (`backend/prisma/schema.prisma`).
* Les fichiers `logs/` sont ignorés dans Git (`.gitignore`).

---

## 👥 Contribution

1. Forker le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Committer (`git commit -m 'Ajout de ma feature'`)
4. Pousser (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

---

## 📜 Licence

Ce projet est sous licence MIT. Vous êtes libre de l’utiliser et de le modifier.
