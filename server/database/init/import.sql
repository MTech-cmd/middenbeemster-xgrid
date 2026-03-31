-- Root gebruiker beschikbaar vanaf alle hosts
CREATE USER IF NOT EXISTS 'bit_academy'@'%' IDENTIFIED BY 'bit_academy';
GRANT ALL PRIVILEGES ON *.* TO 'bit_academy'@'%' WITH GRANT OPTION;

-- Normale user, zelfde credentials
CREATE USER IF NOT EXISTS 'bit_academy'@'%' IDENTIFIED BY 'bit_academy';
GRANT ALL PRIVILEGES ON middenbeemster_Smidse.* TO 'bit_academy'@'%';

FLUSH PRIVILEGES;

-- Database
CREATE DATABASE IF NOT EXISTS middenbeemster_Smidse;

-- Voorbeeld tabel
USE middenbeemster_Smidse;

CREATE TABLE IF NOT EXISTS test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

INSERT INTO test (name) VALUES ('Hello from Docker ready-to-go');

-- DROP DATABASE IF EXISTS `middenbeemster_Smidse`;
CREATE DATABASE `middenbeemster_Smidse`;

USE `middenbeemster_Smidse`;

CREATE TABLE UserAdmin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
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

    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(username),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(username)
);

USE `middenbeemster_Smidse`;

INSERT INTO UserAdmin 
    (username, password) 
VALUES 
    ('admin', 'adminpassword'), 
    ('jasper', 'password123');

    USE `middenbeemster_Smidse`;

INSERT INTO
    Content (Location, ApiName, Content, Type, PublishedBy)
VALUES
    (
        'home',
        'homepage',
        'Welkom op de homepage!',
        'text',
        'admin'
    ),
    (
        'home',
        'homepage',
        'Dit is een tweede tekstblok',
        'text',
        'admin'
    ),
    (
        'about',
        'aboutpage',
        'Over ons pagina content',
        'text',
        'admin'
    ),
    (
        'gallery',
        'images',
        'https://via.placeholder.com/300',
        'image',
        'admin'
    ),
    (
        'video',
        'intro',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'video',
        'admin'
    );