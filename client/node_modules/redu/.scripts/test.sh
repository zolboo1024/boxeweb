#!/usr/bin/env bash

docker-compose run test --build --abort-on-container-exit
docker-compose down -v