-- DROP DATABASE IF EXISTS `middenbeemster_Smidse`;
CREATE DATABASE `middenbeemster_Smidse`;
USE `middenbeemster_Smidse`;

CREATE TABLE UserAdmin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin'
);

-- Content voor Pages aanmaken vóór Pages zelf (Pages verwijst naar Content)
CREATE TABLE Content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page_id INT NOT NULL,                          -- nieuw: koppeling naar Pages
    Location VARCHAR(255) NOT NULL,
    ApiName VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    Type ENUM('text', 'image', 'video') NOT NULL,
    PublishedBy INT NOT NULL,
    lastEditedBy INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id)
    -- page_id FK wordt na Pages aangemaakt (zie onderaan)
);

CREATE TABLE Pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Template VARCHAR(255) NOT NULL,               -- typfout 'Texmplate' gecorrigeerd
    Routing VARCHAR(255) NOT NULL UNIQUE,
    PublishedBy INT NOT NULL,                      -- INT i.p.v. VARCHAR
    lastEditedBy INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id)
);

-- FK van Content naar Pages (nu Pages bestaat)
ALTER TABLE Content
    ADD CONSTRAINT fk_content_page
    FOREIGN KEY (page_id) REFERENCES Pages(id) ON DELETE CASCADE;

CREATE TABLE Navbar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL,
    PublishedBy INT NOT NULL,                      -- INT i.p.v. VARCHAR
    lastEditedBy INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
    FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id)
);