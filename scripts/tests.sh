#!/usr/bin/env bash
. up-test-env.sh || return 1
sleep 2
cd ../backend || return 1
yarn test
cd ../scripts || return 1
. down-test-env.sh
