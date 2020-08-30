#!/usr/bin/env bash
docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app node:6.11.1 npm init --yes