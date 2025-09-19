-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: workshop_client
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `published_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `highlighted` tinyint(1) NOT NULL DEFAULT '0',
  `views_count` int NOT NULL DEFAULT '0',
  `likes_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_id`),
  KEY `Articles_category_id_fkey` (`category_id`),
  CONSTRAINT `Articles_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `articletags`
--

DROP TABLE IF EXISTS `articletags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articletags` (
  `article_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`article_id`,`tag_id`),
  KEY `ArticleTags_tag_id_fkey` (`tag_id`),
  CONSTRAINT `ArticleTags_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ArticleTags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `Categories_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter` (
  `newsletter_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`newsletter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `Tags_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `useractions`
--

DROP TABLE IF EXISTS `useractions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useractions` (
  `action_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  `action_type` enum('view','like','share','newsletter_click') COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`action_id`),
  KEY `UserActions_user_id_fkey` (`user_id`),
  KEY `UserActions_article_id_fkey` (`article_id`),
  CONSTRAINT `UserActions_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `UserActions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userinterests`
--

DROP TABLE IF EXISTS `userinterests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinterests` (
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`category_id`),
  KEY `UserInterests_category_id_fkey` (`category_id`),
  CONSTRAINT `UserInterests_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `UserInterests_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subscription_type` enum('free','subscriber') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'free',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-18 11:13:54

-- ===============================
-- Jeux d’essais pour recommandation
-- ===============================

-- Catégories
INSERT INTO categories (name) VALUES
('Technologie'),
('Santé'),
('Voyage'),
('Économie'),
('Sport'),
('Musique'),
('Cinéma'),
('Cuisine'),
('Histoire'),
('Nature');

-- Tags
INSERT INTO tags (name) VALUES
('Intelligence Artificielle'),
('Machine Learning'),
('Innovation'),
('Fitness'),
('Nutrition'),
('Aventure'),
('Investissement'),
('Football'),
('Rock'),
('Film'),
('Recette'),
('Seconde Guerre Mondiale'),
('Animaux');

-- Utilisateurs
INSERT INTO users (username, email, subscription_type) VALUES
('alice', 'alice@example.com', 'subscriber'),
('bob', 'bob@example.com', 'free'),
('charlie', 'charlie@example.com', 'subscriber'),
('diana', 'diana@example.com', 'free'),
('eve', 'eve@example.com', 'subscriber');

-- ===============================
-- Articles (10 articles)
-- ===============================

-- Cluster cohérent (Technologie + IA)
INSERT INTO articles (title, content, author, category_id, highlighted, views_count, likes_count) VALUES
('Introduction à l’IA', 'Article sur les bases de l’IA...', 'Alice Martin', 1, 1, 100, 30),
('Deep Learning expliqué', 'Contenu sur le deep learning...', 'Bob Dupont', 1, 0, 120, 40),
('Les tendances en Machine Learning', 'Analyse des tendances ML...', 'Charlie Durand', 1, 0, 80, 25),
('Applications de l’IA en santé', 'IA et médecine...', 'Diana Petit', 1, 1, 90, 35),
('IA et futur du travail', 'Impact de l’IA sur l’emploi...', 'Eve Moreau', 1, 0, 110, 50);

-- Articles indépendants (catégories / tags différents)
INSERT INTO articles (title, content, author, category_id, highlighted, views_count, likes_count) VALUES
('Les bienfaits du yoga', 'Article sur la relaxation...', 'Alice Martin', 2, 0, 70, 20),
('Les meilleures destinations en Europe', 'Voyages à faire...', 'Bob Dupont', 3, 0, 150, 60),
('Comment investir en bourse', 'Conseils financiers...', 'Charlie Durand', 4, 1, 90, 25),
('La Coupe du monde de football', 'Analyse des matchs...', 'Diana Petit', 5, 1, 200, 100),
('L’histoire du rock', 'Évolution du rock...', 'Eve Moreau', 6, 0, 50, 10);

-- ===============================
-- Tags des articles
-- ===============================

-- Cluster cohérent (articles 1 à 5 → IA)
INSERT INTO articletags (article_id, tag_id) VALUES
(1, 1), (1, 3),
(2, 1), (2, 2),
(3, 2), (3, 3),
(4, 1), (4, 4),
(5, 1), (5, 2), (5, 3);

-- Articles indépendants
INSERT INTO articletags (article_id, tag_id) VALUES
(6, 4), (6, 5),          -- Yoga → Fitness, Nutrition
(7, 6),                  -- Voyage → Aventure
(8, 7),                  -- Bourse → Investissement
(9, 8),                  -- Sport → Football
(10, 9);                 -- Musique → Rock

-- ===============================
-- Intérêts des utilisateurs
-- ===============================
INSERT INTO userinterests (user_id, category_id) VALUES
(1, 1), (1, 2),   -- Alice aime Technologie & Santé
(2, 3),           -- Bob aime Voyage
(3, 1), (3, 4),   -- Charlie aime Technologie & Économie
(4, 5),           -- Diana aime Sport
(5, 6);           -- Eve aime Musique

-- ===============================
-- UserActions (weights: view=1, like=3, dislike=-2)
-- ===============================

INSERT INTO useractions (user_id, article_id, action_type) VALUES
-- Alice lit et aime beaucoup le cluster IA
(1, 1, 'view'), (1, 1, 'like'),
(1, 2, 'like'),
(1, 3, 'view'),
(1, 5, 'like'),

-- Bob préfère les voyages
(2, 7, 'view'), (2, 7, 'like'),
(2, 3, 'view'),

-- Charlie s’intéresse à IA + finance
(3, 1, 'view'),
(3, 4, 'like'),
(3, 8, 'like'),

-- Diana suit surtout le sport
(4, 9, 'view'), (4, 9, 'like'),
(4, 5, 'dislike'), -- pas fan d’IA appliquée au travail

-- Eve s’intéresse à la musique et un peu à la techno
(5, 10, 'like'),
(5, 2, 'view');

