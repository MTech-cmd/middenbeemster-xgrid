USE `middenbeemster_Smidse`;

-- =========================================
-- PAGES
-- =========================================
INSERT INTO Pages (id, Template, Routing, PublishedBy, lastEditedBy) VALUES
(1, 'HomeTemplate', '/', 1, 1);

-- =========================================
-- NAVBAR
-- =========================================
INSERT INTO Navbar (Name, Link, PublishedBy, lastEditedBy) VALUES
('Midden-Beemster', '/', 1, 1),
('Ontdekken', '/ontdekken', 1, 1),
('3D Tour', '/3d-tour', 1, 1),
('Speel Nu →', '/play', 1, 1);

-- =========================================
-- CONTENT
-- =========================================
INSERT INTO Content 
(page_id, Location, ApiName, Content, Type, PublishedBy, lastEditedBy)
VALUES

-- =========================================
-- EXPERIENCE SECTION
-- =========================================
(1, 'ExperienceSection', '1', 'ONTDEK &amp; BELEVEN', 'text', 1, 1),
(1, 'ExperienceSection', '2', 'Twee manieren om geschiedenis te ervaren', 'text', 1, 1),
(1, 'ExperienceSection', '3', 'Leer meer over de rijke historie van Midden-Beemster of stap direct de virtuele wereld in via onze interactieve 3D scan.', 'text', 1, 1),
(1, 'ExperienceSection', '4', '/images/middenbeemster-history.jpg', 'image', 1, 1),
(1, 'ExperienceSection', '5', 'Midden-Beemster', 'text', 1, 1),
(1, 'ExperienceSection', '6', '/images/middenbeemster-village.jpg', 'image', 1, 1),

(1, 'ExperienceSection', '7', '3D INTERACTIEF', 'text', 1, 1),
(1, 'ExperienceSection', '8', '3D Scan Ervaring', 'text', 1, 1),
(1, 'ExperienceSection', '9', 'Loop door historische gebouwen van Midden-Beemster, klik op objecten en reis terug in de tijd.', 'text', 1, 1),
(1, 'ExperienceSection', '10', '360° Rondlopen', 'text', 1, 1),
(1, 'ExperienceSection', '11', 'Tijdreizen', 'text', 1, 1),
(1, 'ExperienceSection', '12', 'Interacties', 'text', 1, 1),

(1, 'ExperienceSection', '13', 'Midden-Beemster is een pittoresk dorp in de Beemsterpolder — één van de oudste droogmakerijen ter wereld. Drooggelegd in 1612 en in 1999 aangewezen als UNESCO Werelderfgoed, staat de Beemster bekend om zijn unieke rechthoekige landschapspatroon en rijke landbouwgeschiedenis.', 'text', 1, 1),
(1, 'ExperienceSection', '14', 'OVER DE 3D ERVARING', 'text', 1, 1),
(1, 'ExperienceSection', '15', '70%', 'text', 1, 1),
(1, 'ExperienceSection', '16', 'Dankzij geavanceerde 3D-scanningtechnologie is Midden-Beemster volledig digitaal vastgelegd. Loop door historische gebouwen, bekijk details van eeuwenoude architectuur en ontdek verhalen die verborgen zijn in de muren.', 'text', 1, 1),
(1, 'ExperienceSection', '17', '360° rondlopen', 'text', 1, 1),
(1, 'ExperienceSection', '18', 'Object interacties', 'text', 1, 1),
(1, 'ExperienceSection', '19', 'Meerdere locaties', 'text', 1, 1),
(1, 'ExperienceSection', '20', 'Tijdreizen', 'text', 1, 1),
(1, 'ExperienceSection', '21', 'Unieke digitale erfgoed ervaring', 'text', 1, 1),
(1, 'ExperienceSection', '22', '▶ Start de 3D Tour', 'text', 1, 1),
(1, 'ExperienceSection', '23', '/images/3d-scan-preview.jpg', 'image', 1, 1),
(1, 'ExperienceSection', '24', 'LIVE', 'text', 1, 1),
(1, 'ExperienceSection', '25', 'Betreedt Midden-Beemster', 'text', 1, 1),
(1, 'ExperienceSection', '26', 'Volledig interactieve 3D scan omgeving', 'text', 1, 1),
(1, 'ExperienceSection', '27', '360°', 'text', 1, 1),
(1, 'ExperienceSection', '28', 'Rondlopen', 'text', 1, 1),
(1, 'ExperienceSection', '29', '4K', 'text', 1, 1),
(1, 'ExperienceSection', '30', 'Kwaliteit', 'text', 1, 1),
(1, 'ExperienceSection', '31', '1612', 'text', 1, 1),
(1, 'ExperienceSection', '32', 'Tijdperk', 'text', 1, 1),
(1, 'ExperienceSection', '33', 'Stap in een levensechte digitale reconstructie van Midden-Beemster. Verken gebouwen van binnenuit, klik op historische objecten voor verborgen verhalen en maak een reis door de tijd.', 'text', 1, 1),
(1, 'ExperienceSection', '34', 'Vrij rondlopen', 'text', 1, 1),
(1, 'ExperienceSection', '35', 'Navigeer door elk gebouw en elke straat', 'text', 1, 1),
(1, 'ExperienceSection', '36', 'Object interacties', 'text', 1, 1),
(1, 'ExperienceSection', '37', 'Klik op historische objecten voor informatie', 'text', 1, 1),
(1, 'ExperienceSection', '38', 'Meerdere tijdperken', 'text', 1, 1),
(1, 'ExperienceSection', '39', 'Zie hoe Beemster veranderde door de eeuwen', 'text', 1, 1),
(1, 'ExperienceSection', '40', '▶ Start 3D Wandeling', 'text', 1, 1),
(1, 'ExperienceSection', '41', '/images/interactive-tour.jpg', 'image', 1, 1),
(1, 'ExperienceSection', '42', '/images/historic-building.jpg', 'image', 1, 1),
(1, 'ExperienceSection', '43', '/images/beemster-map.jpg', 'image', 1, 1),

-- =========================================
-- FOOTER SECTION
-- =========================================
(1, 'FooterSection', '1', 'Midden-Beemster', 'text', 1, 1),
(1, 'FooterSection', '2', 'Digitaal Erfgoed Project', 'text', 1, 1),
(1, 'FooterSection', '3', 'UNESCO Werelderfgoed · Beemster Polder, Noord-Holland', 'text', 1, 1),
(1, 'FooterSection', '4', '© 2024 Midden-Beemster 3D Scan Project. Alle rechten voorbehouden.', 'text', 1, 1),
(1, 'FooterSection', '5', 'Over ons', 'text', 1, 1),
(1, 'FooterSection', '6', 'Contact', 'text', 1, 1),
(1, 'FooterSection', '7', 'Privacy', 'text', 1, 1),

-- =========================================
-- HERO SECTION
-- =========================================
(1, 'HeroSection', '1', 'BEGIN DE ERVARING', 'text', 1, 1),
(1, 'HeroSection', '2', 'Begin de', 'text', 1, 1),
(1, 'HeroSection', '3', '3D Ervaring', 'text', 1, 1),
(1, 'HeroSection', '4', 'Stap direct in de interactieve 3D scan van Midden-Beemster. Geen download vereist — speel direct in je browser.', 'text', 1, 1),
(1, 'HeroSection', '5', '360° Rondlopen', 'text', 1, 1),
(1, 'HeroSection', '6', 'Tijdreizen', 'text', 1, 1),
(1, 'HeroSection', '7', 'Object interacties', 'text', 1, 1),
(1, 'HeroSection', '8', 'Gratis toegang', 'text', 1, 1),
(1, 'HeroSection', '9', 'Meer Ontdekken ↓', 'text', 1, 1),
(1, 'HeroSection', '10', 'Klik om te starten', 'text', 1, 1),
(1, 'HeroSection', '11', '/images/hero-background.jpg', 'image', 1, 1),

-- =========================================
-- NAVBAR SECTION CONTENT
-- =========================================
(1, 'NavBar', '1', 'Midden-Beemster', 'text', 1, 1),
(1, 'NavBar', '2', 'Ontdekken', 'text', 1, 1),
(1, 'NavBar', '3', '3D Tour', 'text', 1, 1),
(1, 'NavBar', '4', 'Speel Nu →', 'text', 1, 1);