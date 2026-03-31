#!/bin/bash
export $(grep -v '^#' ../../.env | xargs)

echo "🚀 Starting DB stack..."
cd "$(dirname "$0")/.."

docker compose --env-file ../../.env up -d

echo ""
echo "✅ Klaar!"
echo "👉 phpMyAdmin: http://localhost:${PMA_PORT}"
echo "👉 MariaDB: localhost:${DB_PORT}"