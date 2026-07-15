-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: nmit
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Current Database: `nmit`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `nmit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `nmit`;

--
-- Table structure for table `eventregister`
--

DROP TABLE IF EXISTS `eventregister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventregister` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(45) DEFAULT NULL,
  `usn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `branch` varchar(45) DEFAULT NULL,
  `mailid` varchar(45) DEFAULT NULL,
  `semester` varchar(45) DEFAULT NULL,
  `phoneno` varchar(45) DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id` (`event_id`),
  CONSTRAINT `fk_event_id` FOREIGN KEY (`event_id`) REFERENCES `eventstable` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventregister`
--

LOCK TABLES `eventregister` WRITE;
/*!40000 ALTER TABLE `eventregister` DISABLE KEYS */;
INSERT INTO `eventregister` VALUES (19,'IDEATHON','005','abhi','ise','xyz@gmail.com','3','123356789',12),(20,'IDEATHON','1nt23is005','abhiii','ise','xyz@gmail.com','2','1234567890',12),(21,'IDEATHON','1nt23is005','abhi','ise','abhijithravi2005@gmail.com','2','7204222472',12),(22,'abhijith','1NT23IS005','ABHIJITH','BRAN','as@email.com','23','1234',17),(23,'abhijith','1NT23IS005','ABHIJITH','BRAN','as@email.com','23','1234',17),(24,'abhijith','1NT23IS005','ABHIJITH','BRAN','as@email.com','23','1234',17),(25,'abhijith','1NT23IS005','ABHIJITH','BRAN','as@email.com','23','1234',17),(26,'abhijith','1NT23IS005','ABHIJITH','BRAN','as@email.com','23','1234',17),(27,'abhijith','1NT23IS005','ABHIJITH','BRAN','as@email.com','23','1234',17),(28,'abhijith','1234','abhi','qwd','qwsd@g.com','5','12345',17);
/*!40000 ALTER TABLE `eventregister` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventstable`
--

DROP TABLE IF EXISTS `eventstable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventstable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventstable`
--

LOCK TABLES `eventstable` WRITE;
/*!40000 ALTER TABLE `eventstable` DISABLE KEYS */;
INSERT INTO `eventstable` VALUES (12,'IDEATHON','THIS IS IDEATHON','2024-10-30 18:30:00','NMIT'),(14,'CODE SPIRIT','Join us for Code Spirit, an exciting coding event organized by GDSC! Showcase your programming skills, collaborate with peers, and tackle challenges to create innovative solutions. ','2024-10-25 14:31:00','NMIT'),(15,'CODING','WELCOME TO CODING','2024-10-30 19:29:00','NMIT'),(16,'abh','awre','2004-02-12 12:23:00','af'),(17,'abhijith','AQWERG','2027-03-12 12:12:00','AD');
/*!40000 ALTER TABLE `eventstable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logintable`
--

DROP TABLE IF EXISTS `logintable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logintable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `usertype` varchar(45) DEFAULT NULL,
  `pwd` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logintable`
--

LOCK TABLES `logintable` WRITE;
/*!40000 ALTER TABLE `logintable` DISABLE KEYS */;
INSERT INTO `logintable` VALUES (31,'abhi','student','09876'),(32,'abhiadmin','admin','123456'),(33,'abhijith','admin','1234567'),(34,'aaaaaaa','admin','12345678'),(35,'abab','student','1234'),(36,'abhijith','student','12345678'),(37,'abhijith','admin','123456789');
/*!40000 ALTER TABLE `logintable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-10 19:50:44
