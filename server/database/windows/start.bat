@echo off
cd /d %~dp0\..

echo Starting DB stack...
docker compose --env-file ../../.env up -d

echo.
echo Done!
echo phpMyAdmin: http://localhost:%PMA_PORT%
echo MariaDB: localhost:%DB_PORT%
pause