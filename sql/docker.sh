#!/bin/bash
export $(grep -v '^#' .env | xargs -d '\n')

docker volume create api_projectly_vol
docker network create api_projectly_net
docker run --name postgres-api-projectly --rm -P -p $PGHOST:$PGPORT:5432 --network api_projectly_net -e POSTGRES_USER=$PGUSER -e POSTGRES_PASSWORD=$PGPASSWORD -v api_projectly_vol:/var/lib/postgresql/data -d $PGDATABASE

# Wait for PostgreSQL
while ! docker exec postgres-api-projectly pg_isready -U $PGUSER -h localhost -p 5432 > /dev/null 2>&1; do
    sleep 1
done

# create table
docker cp sql/tables.sql postgres-api-projectly:/tmp/tables.sql
docker exec -i postgres-api-projectly psql -U $PGUSER < sql/tables.sql

unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs -d '\n')