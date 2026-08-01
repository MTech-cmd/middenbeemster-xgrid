-- DROP DATABASE IF EXISTS `middenbeemster_Smidse`;
CREATE DATABASE `middenbeemster_Smidse`;
USE `middenbeemster_Smidse`;

CREATE TABLE UserAdmin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin'
);

CREATE TABLE MediaAsset (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Filename VARCHAR(255) NOT NULL,
    OriginalName VARCHAR(255) NOT NULL,
    StoragePath VARCHAR(255) NOT NULL,
    Url VARCHAR(255) NOT NULL UNIQUE,
    MimeType VARCHAR(100),
    FileSize BIGINT,
    CreatedBy INT NULL,
    lastEditedBy INT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Content voor Pages aanmaken vóór Pages zelf (Pages verwijst naar Content)
CREATE TABLE Content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page_id INT NOT NULL,                          -- nieuw: koppeling naar Pages
    Location VARCHAR(255) NOT NULL,
    ApiName VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    Type ENUM('text', 'image', 'video') NOT NULL,
MediaId INT NULL,
    PublishedBy INT NOT NULL,
    lastEditedBy INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PublishedBy) REFERENCES UserAdmin(id),
FOREIGN KEY (lastEditedBy) REFERENCES UserAdmin(id),
FOREIGN KEY (MediaId) REFERENCES MediaAsset(id) ON DELETE
SET
    NULL
    -- page_id FK wordt na Pages aangemaakt (zie onderaan)
);

CREATE TABLE Pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
Website VARCHAR(255) NOT NULL,
    Template VARCHAR(255) NOT NULL,               -- typfout 'Texmplate' gecorrigeerd
Routing VARCHAR(255) NOT NULL,
    PublishedBy INT NOT NULL,                      -- INT i.p.v. VARCHAR
    lastEditedBy INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
UNIQUE KEY uniq_pages_website_routing (Website, Routing),
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
CREATE TABLE NavbarSettings (
    id INT PRIMARY KEY,
    LogoMediaId INT NULL,
    LogoAltText VARCHAR(255) NOT NULL DEFAULT 'Middenbeemster Smidse',
    LogoWidth INT NOT NULL DEFAULT 180,
    LogoHeight INT NOT NULL DEFAULT 48,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (LogoMediaId) REFERENCES MediaAsset(id) ON DELETE
    SET
        NULL
);