#!/bin/bash
docker stop test_postgres-api-projectly
sleep 1
docker volume rm test_api_projectly_vol
docker network rm test_api_projectly_net