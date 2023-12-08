CREATE DATABASE  IF NOT EXISTS `flexfolio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `flexfolio`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: flexfolio
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `user_email` varchar(64) NOT NULL,
  `user_name` varchar(64) NOT NULL,
  `user_password` varchar(64) NOT NULL,
  `user_photo_url` varchar(255) DEFAULT NULL,
  `date_registered` datetime DEFAULT NULL,
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES ('ben@gmail.com','Benjamin','$2b$10$hqgg/wHSwhT.9OFk7cWBNeBm9Yv2OavaplXFkDYBOlJu8KZtAyPOK','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png','2023-12-07 21:41:16'),('chase@gmail.com','Tim','$2b$10$Hq0bGejVP7EpDPnWf9FI8.l62jfZ.VuaRVmr9rncr/NB5N62CkV6y','api/users/images/07557b0eff86ba3bc9dd5b52d5233a93','2023-12-07 21:37:20'),('kelly@gmail.com','kelly','$2b$10$rbQiJa09/8zfUSnRtpiD1O8/z/X1nW1L.42Sw9cet6nucF6wWk5DG','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png','2023-12-07 21:43:46'),('tim506877@gmail.com','Tim','$2b$10$WGxqdgPQG/iWRYa5w7BecuRCYD6rx4mJpNHSlGx3SIfYoYleUe/4.','api/users/images/d79cad20ff936305814b528ed7606de0','2023-12-07 21:42:38');
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `caption` tinytext,
  `date_posted` datetime DEFAULT NULL,
  `images_url` varchar(255) DEFAULT NULL,
  `user_email` varchar(64) DEFAULT NULL,
  `group_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_email` (`user_email`),
  KEY `group_name` (`group_name`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `app_user` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`group_name`) REFERENCES `workout_group` (`group_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Hello World!','2023-12-07 21:40:37','/api/posts/images/f339bfcd4a4d79c637a099216e2ff7aa','chase@gmail.com','48winter'),(2,'esketti!!!!','2023-12-07 21:44:35','/api/posts/images/cd2a7778f02011b09d3034ab0919426c','kelly@gmail.com','hellosexy'),(3,'wasssssuuuppppp','2023-12-07 21:45:24','/api/posts/images/45b39302287325e7cc07739795e01c09','tim506877@gmail.com','hellosexy'),(4,'let\'s get this bread','2023-12-07 21:45:48','/api/posts/images/ca4a43ec2bf7692d404b32aab3a50307','tim506877@gmail.com','48winter');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_comment`
--

DROP TABLE IF EXISTS `user_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_email` varchar(64) DEFAULT NULL,
  `comment_text` text,
  `date_commented` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_email` (`user_email`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `user_comment_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `app_user` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comment`
--

LOCK TABLES `user_comment` WRITE;
/*!40000 ALTER TABLE `user_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group` (
  `user_email` varchar(64) NOT NULL,
  `group_name` varchar(64) NOT NULL,
  PRIMARY KEY (`user_email`,`group_name`),
  KEY `group_name` (`group_name`),
  CONSTRAINT `user_group_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `app_user` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_ibfk_2` FOREIGN KEY (`group_name`) REFERENCES `workout_group` (`group_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES ('ben@gmail.com','48winter'),('chase@gmail.com','48winter'),('tim506877@gmail.com','48winter'),('kelly@gmail.com','hellosexy'),('tim506877@gmail.com','hellosexy');
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_likes_post`
--

DROP TABLE IF EXISTS `user_likes_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_likes_post` (
  `date_liked` datetime DEFAULT NULL,
  `user_email` varchar(64) NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_email`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `user_likes_post_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `app_user` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_likes_post_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_likes_post`
--

LOCK TABLES `user_likes_post` WRITE;
/*!40000 ALTER TABLE `user_likes_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_likes_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_group`
--

DROP TABLE IF EXISTS `workout_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_group` (
  `group_name` varchar(64) NOT NULL,
  `group_passcode` int DEFAULT NULL,
  `group_photo_url` varchar(255) DEFAULT NULL,
  `group_description` text,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`group_name`),
  UNIQUE KEY `group_passcode` (`group_passcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_group`
--

LOCK TABLES `workout_group` WRITE;
/*!40000 ALTER TABLE `workout_group` DISABLE KEYS */;
INSERT INTO `workout_group` VALUES ('48winter',787878,'/api/groups/images/e73315b541240fed963604d2ee18be72','bulking','2023-12-07 21:40:22'),('hellosexy',909090,'/api/groups/images/507473df0f7a93af6d766bc0589ac510','iam sexy','2023-12-07 21:44:21');
/*!40000 ALTER TABLE `workout_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workouts` (
  `workout_id` int NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(64) DEFAULT NULL,
  `sets` int DEFAULT NULL,
  `reps` int DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `date_recorded` datetime DEFAULT NULL,
  `user_email` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`workout_id`),
  KEY `user_email` (`user_email`),
  CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `app_user` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workouts`
--

LOCK TABLES `workouts` WRITE;
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` VALUES (2,'curl',23,3,50.00,'2023-12-07 21:38:04','chase@gmail.com'),(3,'push up',23,23,50.00,'2023-12-07 21:38:12','chase@gmail.com'),(4,'bicep',23,12,321.00,'2023-12-07 21:41:37','ben@gmail.com'),(5,'bicep',23,12,32.00,'2023-12-07 21:42:03','ben@gmail.com'),(6,'pull up',50,50,1.00,'2023-12-07 21:43:08','tim506877@gmail.com'),(7,'sit',23,33,50.00,'2023-12-07 21:43:59','kelly@gmail.com');
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'flexfolio'
--

--
-- Dumping routines for database 'flexfolio'
--
/*!50003 DROP PROCEDURE IF EXISTS `comment_on_post` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `comment_on_post`(IN post_id_param INT, IN user_id_param VARCHAR(64), IN comment_text_param TEXT)
BEGIN
    -- Add a comment to the post by the user
    INSERT INTO user_comment(post_id, user_email, comment_text, date_commented) 
    VALUES (post_id_param, user_id_param, comment_text_param, NOW());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_group` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_group`(
    IN group_name_param VARCHAR(64), 
    IN description_param TEXT, 
    IN passcode_param INT, 
    IN user_email_param VARCHAR(64),
    IN group_photo_url_param VARCHAR(255))
BEGIN
    -- Create a new group with the given details
    INSERT INTO workout_group(group_name, group_passcode, group_photo_url, group_description, date_created) 
    VALUES (group_name_param, passcode_param, group_photo_url_param, description_param, NOW());  -- Include group_photo_url in the INSERT statement

    -- Add the creator as a member of the group
    INSERT INTO user_group(user_email, group_name) VALUES (user_email_param, group_name_param);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_post` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_post`(IN user_id_param VARCHAR(64), IN group_name_param VARCHAR(64), IN content_param TEXT, IN image_url_param VARCHAR(255))
BEGIN
    -- Insert a new post in the post table
    INSERT INTO post(caption, date_posted, images_url, user_email, group_name) 
    VALUES (content_param, NOW(), image_url_param, user_id_param, group_name_param);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_user`(IN email_param VARCHAR(64), IN password_param VARCHAR(64), IN name_param VARCHAR(64))
BEGIN
    -- Check if the email already exists in the database
    DECLARE email_exists_var BOOL;
    SELECT EXISTS(SELECT 1 FROM app_user WHERE user_email = email_param) INTO email_exists_var;

    IF NOT email_exists_var THEN
        -- Insert the new user into the app_user table
        INSERT INTO app_user(user_email, user_password, user_name, date_registered) 
        VALUES (email_param, password_param, name_param, NOW());
    ELSE
        -- Raise an error if the email already exists
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already exists';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_post` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post`(IN post_id_param INT, IN user_id_param VARCHAR(64))
BEGIN
    -- Delete post if the user is the author
    DELETE FROM post WHERE post_id = post_id_param AND user_email = user_id_param;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `join_group` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `join_group`(IN group_name_param VARCHAR(64), IN user_email_param VARCHAR(64), IN passcode_param INT)
BEGIN
    -- Retrieve the passcode for the group
    DECLARE group_passcode_var INT;
    SELECT group_passcode INTO group_passcode_var FROM workout_group WHERE group_name = group_name_param;

    -- Add user to group if passcode matches
    IF group_passcode_var = passcode_param THEN
        INSERT INTO user_group(user_email, group_name) VALUES (user_email_param, group_name_param);
    ELSE
        -- Raise an error if passcode doesn't match
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid passcode';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `like_post` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `like_post`(IN post_id_param INT, IN user_id_param VARCHAR(64))
BEGIN
    -- Insert a like for the post by the user
    INSERT INTO user_likes_post(date_liked, user_email, post_id) VALUES (NOW(), user_id_param, post_id_param);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `log_workout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `log_workout`(
    IN user_id_param VARCHAR(64), 
    IN exercise_name_param VARCHAR(64), 
    IN sets_param INT, 
    IN reps_param INT,
    IN weight_param DECIMAL(5, 2)  -- New weight parameter
)
BEGIN
    -- Log a workout session for the user, including the weight
    INSERT INTO workouts(exercise_name, sets, reps, weight, date_recorded, user_email) 
    VALUES (exercise_name_param, sets_param, reps_param, weight_param, NOW(), user_id_param);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_profile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_profile`(IN user_id_param VARCHAR(64), IN new_name_param VARCHAR(64), IN new_password_param VARCHAR(64))
BEGIN
    -- Update the user's profile with new details
    UPDATE app_user SET user_name = new_name_param, user_password = new_password_param WHERE user_email = user_id_param;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07 21:46:57
