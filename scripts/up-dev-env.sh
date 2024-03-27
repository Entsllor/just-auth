#!/usr/bin/env bash
echo 'trying to up dev environment'
docker compose --env-file=../.env -p dev -f ../infrastructure/docker/docker-compose-env.yml up --build -d
echo 'dev environment is upped'
