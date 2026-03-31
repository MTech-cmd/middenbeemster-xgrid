#!/bin/bash

cd "$(dirname "$0")/.."

echo "⚠️ Resetting database..."

docker compose down
rm -rf data

docker compose --env-file ../../.env up -d

echo "✅ Done!"