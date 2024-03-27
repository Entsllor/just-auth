#!/usr/bin/env bash
dir="$(dirname "$(realpath $0)")/../keys/auth/"
mkdir -p "${dir}"
ssh-keygen -t rsa -b 4096 -m PEM -f "${dir}"jwt.key -N ""

openssl rsa -in "${dir}"jwt.key -pubout -outform PEM -out "${dir}"jwt.key.pub
