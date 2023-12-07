#!/bin/bash
export $(grep -v '^#' .env | xargs -d '\n')

docker volume create test_api_projectly_vol
docker network create test_api_projectly_net
docker run --name test_postgres-api-projectly --rm -P -p $PGHOST:$PGPORT:5432 --network test_api_projectly_net -e POSTGRES_USER=$PGUSER -e POSTGRES_PASSWORD=$PGPASSWORD -v test_api_projectly_vol:/var/lib/postgresql/data -d $PGDATABASE

# Wait for PostgreSQL
while ! docker exec test_postgres-api-projectly pg_isready -U $PGUSER -h localhost -p 5432 > /dev/null 2>&1; do
    sleep 1
done

# create table
docker cp sql/tables.sql test_postgres-api-projectly:/tmp/tables.sql
docker exec -i test_postgres-api-projectly psql -U $PGUSER < sql/tables.sql

# fill
docker cp sql/fill.sql test_postgres-api-projectly:/tmp/fill.sql
docker exec -i test_postgres-api-projectly psql -U $PGUSER < sql/fill.sql