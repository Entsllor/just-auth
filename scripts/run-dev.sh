#!/usr/bin/env bash

. ./up_dev_env.sh || return 0
cd ..
cp -n .env.dev .env
bun install --frozen-lockfile
bun run-migrations-and-start
cd - || return 0