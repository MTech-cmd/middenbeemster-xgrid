@echo off
cd /d %~dp0\..

echo Stopping...
docker compose down

pause