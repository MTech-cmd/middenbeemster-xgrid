-- DROP DATABASE IF EXISTS `middenbeemster_Smidse`;
CREATE DATABASE `middenbeemster_Smidse`;

USE `middenbeemster_Smidse`;

CREATE TABLE UserAdmin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin'
);

CREATE TABLE Pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Texmplate VARCHAR(255) NOT NULL,
    Routing VARCHAR(255) NOT NULL UNIQUE,
    PublishedBy varchar(255) NOT NULL,
    lastEditedBy varchar(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (id) REFERENCES Content(id)
);

CREATE TABLE Navbar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL,
    PublishedBy varchar(255) NOT NULL,
    lastEditedBy varchar(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id)
);

CREATE TABLE Content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Location VARCHAR(255) NOT NULL,
    ApiName VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    Type ENUM('text', 'image', 'video') NOT NULL,
    PublishedBy varchar(255) NOT NULL,
    lastEditedBy varchar(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id)
);