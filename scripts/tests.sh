#!/usr/bin/env bash
. up-test-env.sh || return 1
sleep 2
cd ..
bun test --env-file .env.test
cd ./scripts || return 1
. down-test-env.sh
