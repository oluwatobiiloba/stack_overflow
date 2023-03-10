-- Create MochaUser

drop user root@localhost;

flush privileges;

CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';

GRANT
SELECT,
INSERT,
UPDATE,
DELETE
,
    CREATE,
    DROP ON *.* TO 'root' @'localhost';

-- # Create DB

CREATE DATABASE
    IF NOT EXISTS `database_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `database_test`;

SET FOREIGN_KEY_CHECKS = 0;

-- # Create Table

CREATE TABLE
    `users` (
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
        `is_verified` tinyint(1) NOT NULL DEFAULT '0',
        `passwordResetToken` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `username` (`username`),
        UNIQUE KEY `username_2` (`username`),
        UNIQUE KEY `username_3` (`username`),
        UNIQUE KEY `username_4` (`username`),
        UNIQUE KEY `username_5` (`username`),
        KEY `userId` (`userId`),
        CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `votes` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 666 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Create syntax for TABLE 'questions'

CREATE TABLE
    `questions` (
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
    ) ENGINE = InnoDB AUTO_INCREMENT = 294 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Create syntax for TABLE 'answers'

CREATE TABLE
    `answers` (
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
    ) ENGINE = InnoDB AUTO_INCREMENT = 313 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Create syntax for TABLE 'comments'

CREATE TABLE
    `comments` (
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
    ) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `voters` (
        `id` int NOT NULL AUTO_INCREMENT,
        `userId` int NOT NULL,
        `answerId` int NOT NULL,
        `upvotes` tinyint(1) DEFAULT '0',
        `downvotes` tinyint(1) DEFAULT '0',
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 295 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `verify_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `verification_timestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `email_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `html_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--  Add Data

INSERT INTO
    `users` (
        `id`,
        `username`,
        `password`,
        `first_name`,
        `last_name`,
        `phonenumber`,
        `email`,
        `role`,
        `stack`,
        `age`,
        `nationality`,
        `createdAt`,
        `updatedAt`,
        `userId`
    )
VALUES (
        1,
        'Mocha',
        '$2a$10$ad1nSUmBhIm.4nTUfCIO2OUnWOmawajTOaZ2ItaxtSX3QLr9PoX1u',
        'Mocha',
        'Chai',
        823322528,
        'mocha@mochatest.com',
        2,
        NULL,
        NULL,
        NULL,
        NOW(),
        NOW(),
        NULL
    );

INSERT INTO
    `questions` (
        `id`,
        `question`,
        `status`,
        `userId`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'Hell, yeah!',
        1,
        1,
        NOW(),
        NOW()
    );

INSERT INTO
    `answers` (
        `id`,
        `answer`,
        `downvotes`,
        `upvotes`,
        `accepted`,
        `userId`,
        `questionId`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'yes !',
        1,
        0,
        0,
        1,
        1,
        NOW(),
        NOW()
    );

INSERT INTO
    `comments` (
        `id`,
        `uuid`,
        `userId`,
        `answerId`,
        `comment`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        X'30633664663432342D323738342D343166342D623662652D323061363264346636613137',
        1,
        1,
        'retry,bro',
        NOW(),
        NOW()
    );

INSERT INTO
    `voters` (
        `id`,
        `userId`,
        `answerId`,
        `upvotes`,
        `downvotes`,
        `createdAt`,
        `updatedAt`
    )
VALUES (1, 1, 1, 1, 0, NOW(), NOW()), (2, 1, 1, 1, 1, NOW(), NOW());

SELECT * FROM users;

SELECT * FROM questions;

SELECT * FROM answers;

SELECT * FROM voters;