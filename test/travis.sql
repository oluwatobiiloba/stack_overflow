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
	(X'62333838346231392D353331342D346631622D616265332D326236646564616534316632', 1, 'Mocha', '$2a$10$ad1nSUmBhIm.4nTUfCIO2OUnWOmawajTOaZ2ItaxtSX3QLr9PoX1u', 'Mocha', 'Chai', 823322528, 'mocha@mochatest.com', 2, NULL, NULL, NULL, '2022-10-25 15:31:08', '2022-10-25 15:31:08', NULL);

INSERT INTO `answers` (`uuid`, `answer`, `downvotes`, `upvotes`, `accepted`, `userId`, `questionId`, `createdAt`, `updatedAt`)
VALUES
	(X'31373763333838642D326365342D346134322D616236642D666464643030323934663761', 'yes !', 3, 0, 0, 3, 1, '2022-10-18 20:45:57', '2023-02-18 17:11:23'),
	(X'62643531393665632D633434382D343837352D613639612D636534366237396237396438', 'I tried my best!', 0, 0, 0, 2, 2, '2022-10-18 20:46:50', '2022-10-18 20:46:50'),
	(X'31616232383037662D343331652D343732382D393939342D303663656134643636303334', 'Testing votes!', 26, 58, 0, 3, 2, '2022-10-18 22:45:21', '2022-10-27 13:01:27'),
	(X'34646233326663662D373134312D343634342D393461342D326430663830343435363734', 'Refactoring Test', 0, 0, 0, 3, 2, '2022-10-20 21:48:24', '2022-10-20 21:48:24'),
	(X'39306136333839662D376534332D343638662D623762662D636637333365336531376139', 'Refactoring Test', 0, 2, 0, 3, 2, '2022-10-20 22:11:07', '2023-02-17 08:42:54'),
	(X'35613337303362612D626561652D346233652D396565352D646239303065343261386636', 'Refactoring Test', 0, 0, 0, 3, 2, '2022-10-20 22:15:45', '2022-10-20 22:15:45');


INSERT INTO `comments` (`uuid`, `userId`, `answerId`, `comment`, `createdAt`, `updatedAt`)
VALUES
	(X'30633664663432342D323738342D343166342D623662652D323061363264346636613137', 20, 10, 'retry,bro', '2023-02-13 14:16:09', '2023-02-13 14:16:09');

INSERT INTO `questions` (`uuid`, `question`, `status`, `userId`, `createdAt`, `updatedAt`)
VALUES
	(X'65623831346238332D343338302D346264662D613332302D636131353366333765623961', 'Hell, yeah!', 1, 1, '2022-10-18 20:39:53', '2022-10-18 20:39:53'),
	(X'66343262623363642D623066372D346564322D396231322D333330656465653730313062', 'Another one?', 1, 1, '2022-10-18 20:40:05', '2022-10-18 20:40:05'),
	(X'62613339626338352D333333642D346166662D393261642D306561396333313031646266', 'is there dinner?', 1, 2, '2022-10-18 20:40:29', '2022-10-18 20:40:29'),
	(X'39616434346663652D366163312D343630662D383764312D363635613832363839646332', 'Do you love me?', 1, 3, '2022-10-18 20:40:56', '2022-10-18 20:40:56'),
	(X'37376433346166612D396562632D343266352D393537382D396439366630373237333361', 'Do you love me?', 1, 3, '2022-10-21 09:24:05', '2022-10-21 09:24:05'),
	(X'38383537343430382D366233332D346664372D383437332D646234656434616535376466', 'Does the question services work?', 1, 3, '2022-10-21 10:02:24', '2022-10-21 10:02:24');

INSERT INTO `voters` (`userId`, `answerId`, `upvotes`, `downvotes`, `createdAt`, `updatedAt`)
VALUES
	(19, 3, 1, 0, '2022-10-27 12:19:29', '2022-10-27 13:01:27'),
	(21, 3, 1, 0, '2022-10-27 13:41:22', '2022-10-27 13:41:27'),
	(23, 3, 0, 1, '2022-10-27 13:43:44', '2022-10-27 18:57:06'),
	(3, 7, 0, 0, '2022-12-03 10:16:57', '2022-12-03 10:16:57'),
	(3, 8, 0, 0, '2022-12-03 10:17:17', '2022-12-03 10:17:17');