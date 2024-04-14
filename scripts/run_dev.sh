#!/usr/bin/env bash

. up-dev-env.sh || return 0
cd ..
cp -n .env.dev .env
cd ./backend || return 0
yarn install
yarn migration:run
yarn dev
cd cd ../scripts || return 0