#!/bin/bash
docker volume create api_projectly_vol
docker network create api_projectly_net
docker run --name postgres-api-projectly --rm -P -p 5432:5432 --network api_projectly_net -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -v api_projectly_vol:/var/lib/postgresql/data -d postgres

# Wait for PostgreSQL
while ! docker exec postgres-api-projectly pg_isready -U postgres -h localhost -p 5432 > /dev/null 2>&1; do
    sleep 1
done

# create table
docker cp sql/tables.sql postgres-api-projectly:/tmp/tables.sql
docker exec -i postgres-api-projectly psql -U postgres < sql/tables.sql