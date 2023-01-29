# Create MochaUser
-- drop user admin@localhost;
-- flush privileges;
-- CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'root'@'localhost';

# Create DB
CREATE DATABASE IF NOT EXISTS `database_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `database_test`;

# Create Table
CREATE TABLE `users` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phonenumber` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `stack` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `username_5` (`username`),
  KEY `userId` (`userId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `votes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

# Add Data
INSERT INTO `users` (`uuid`, `id`, `username`, `password`, `first_name`, `last_name`, `phonenumber`, `email`, `role`, `stack`, `age`, `nationality`, `createdAt`, `updatedAt`, `userId`)
VALUES
	(X'62333838346231392D353331342D346631622D616265332D326236646564616534316632', 19, 'Mocha', '$2a$10$ad1nSUmBhIm.4nTUfCIO2OUnWOmawajTOaZ2ItaxtSX3QLr9PoX1u', 'Mocha', 'Chai', 823322528, 'mocha@mochatest.com', 2, NULL, NULL, NULL, '2022-10-25 15:31:08', '2022-10-25 15:31:08', NULL);

