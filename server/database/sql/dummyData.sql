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