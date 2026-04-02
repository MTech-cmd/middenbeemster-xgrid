@echo off
cd /d %~dp0\..

echo Resetting database...

docker compose down
rmdir /s /q data

docker compose --env-file ../../.env up -d

echo Done!
pause