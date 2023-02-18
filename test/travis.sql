# Create MochaUser
drop user root@localhost;
FLUSH PRIVILEGES;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'root'@'localhost';

# Create DB
CREATE DATABASE IF NOT EXISTS `database_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `database_test`;

# Create Table
CREATE TABLE `users` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `phonenumber` bigint NOT NULL,
  `email` varchar(191) NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `stack` varchar(191) DEFAULT NULL,
  `age` varchar(191) DEFAULT NULL,
  `nationality` varchar(191) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'questions'
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `question` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create syntax for TABLE 'answers'
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `answer` longtext NOT NULL,
  `downvotes` int DEFAULT '0',
  `upvotes` int DEFAULT '0',
  `accepted` tinyint(1) DEFAULT '0',
  `userId` int NOT NULL,
  `questionId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `answers_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_8` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=313 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create syntax for TABLE 'comments'
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` int NOT NULL,
  `answerId` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `answerId` (`answerId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`answerId`) REFERENCES `answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `voters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `answerId` int NOT NULL,
  `upvotes` tinyint(1) DEFAULT '0',
  `downvotes` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

# Add Data
INSERT INTO `users` (`uuid`, `id`, `username`, `password`, `first_name`, `last_name`, `phonenumber`, `email`, `role`, `stack`, `age`, `nationality`, `createdAt`, `updatedAt`, `userId`)
VALUES
	(X'62333838346231392D353331342D346631622D616265332D326236646564616534316632', 1, 'Mocha', '$2a$10$ad1nSUmBhIm.4nTUfCIO2OUnWOmawajTOaZ2ItaxtSX3QLr9PoX1u', 'Mocha', 'Chai', 823322528, 'mocha@mochatest.com', 2, NULL, NULL, NULL, NOW(), NOW(), NULL);

INSERT INTO `questions` (`uuid`, `question`, `status`, `userId`, `createdAt`, `updatedAt`)
VALUES
	(X'65623831346238332D343338302D346264662D613332302D636131353366333765623961', 'Hell, yeah!', 1, 1, NOW(), NOW());
