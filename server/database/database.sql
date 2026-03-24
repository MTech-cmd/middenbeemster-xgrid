CREATE DATABASE `middenbeemster_Smidse`;

USE `middenbeemster_Smidse`;

CREATE TABLE UserAdmin (
    'id' INT PRIMARY KEY AUTO_INCREMENT,
    'username' VARCHAR(255) NOT NULL,
    'password' VARCHAR(255) NOT NULL
);

CREATE TABLE Content (
    'id' INT PRIMARY KEY AUTO_INCREMENT,
    'Location' VARCHAR(255) NOT NULL,
    'ApiName' VARCHAR(255) NOT NULL,
    'Content' TEXT NOT NULL,
    'Type' ENUM('text', 'image', 'video') NOT NULL,
    'PublishedBy' varchar(255) NOT NULL,
    'lastEditedBy' varchar(255),
    'CreatedAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'UpdatedAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(username),
FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(username);