#!/bin/sh
set -eu

PGDATA=${PGDATA:-/var/lib/postgresql/data}
POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-secret}
POSTGRES_DB=${POSTGRES_DB:-items}
POSTGRES_HOST=${POSTGRES_HOST:-127.0.0.1}
POSTGRES_PORT=${POSTGRES_PORT:-5432}
PORT=${PORT:-5000}
DEFAULT_SCHEMA_ENABLED=${DEFAULT_SCHEMA_ENABLED:-1}
INIT_SQL_DIR=${INIT_SQL_DIR:-/app/docker/initdb}
SCHEMA_SQL_FILE=${SCHEMA_SQL_FILE:-}
SEED_SQL_FILE=${SEED_SQL_FILE:-}

PGBIN=""
if command -v initdb >/dev/null 2>&1; then
  PGBIN=""
elif [ -x /usr/lib/postgresql/16/bin/initdb ]; then
  PGBIN="/usr/lib/postgresql/16/bin"
elif [ -x /usr/lib/postgresql/15/bin/initdb ]; then
  PGBIN="/usr/lib/postgresql/15/bin"
else
  echo "error: initdb not found in PATH or known PostgreSQL bin directories" >&2
  exit 1
fi

PG_INITDB="${PGBIN:+$PGBIN/}initdb"
PG_CTL="${PGBIN:+$PGBIN/}pg_ctl"
PSQL="${PGBIN:+$PGBIN/}psql"

mkdir -p "$PGDATA" /run/postgresql
chown -R postgres:postgres "$PGDATA" /run/postgresql

NEW_CLUSTER=0
if [ ! -s "$PGDATA/PG_VERSION" ]; then
  gosu postgres "$PG_INITDB" -D "$PGDATA"
  NEW_CLUSTER=1
fi

if ! grep -q "listen_addresses" "$PGDATA/postgresql.conf"; then
  echo "listen_addresses = '127.0.0.1'" >> "$PGDATA/postgresql.conf"
else
  sed -i "s/^#\?listen_addresses.*/listen_addresses = '127.0.0.1'/" "$PGDATA/postgresql.conf"
fi

if ! grep -q "host all all 127.0.0.1/32" "$PGDATA/pg_hba.conf"; then
  echo "host all all 127.0.0.1/32 scram-sha-256" >> "$PGDATA/pg_hba.conf"
fi

gosu postgres "$PG_CTL" -D "$PGDATA" -o "-p $POSTGRES_PORT" -w start

DB_EXISTS=$(gosu postgres "$PSQL" -tAc "SELECT 1 FROM pg_roles WHERE rolname='${POSTGRES_USER}'")
if [ "$DB_EXISTS" != "1" ]; then
  gosu postgres "$PSQL" -v ON_ERROR_STOP=1 <<-SQL
    CREATE ROLE ${POSTGRES_USER} LOGIN PASSWORD '${POSTGRES_PASSWORD}';
SQL
fi

DB_EXISTS=$(gosu postgres "$PSQL" -tAc "SELECT 1 FROM pg_database WHERE datname='${POSTGRES_DB}'")
if [ "$DB_EXISTS" != "1" ]; then
  gosu postgres "$PSQL" -v ON_ERROR_STOP=1 <<-SQL
    CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};
SQL
fi

if [ "$DEFAULT_SCHEMA_ENABLED" = "1" ]; then
  gosu postgres "$PSQL" -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" <<-SQL
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      category TEXT
    );

    ALTER TABLE items OWNER TO ${POSTGRES_USER};
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE items TO ${POSTGRES_USER};
    GRANT USAGE, SELECT ON SEQUENCE items_id_seq TO ${POSTGRES_USER};
SQL
fi

if [ "$NEW_CLUSTER" = "1" ]; then
  if [ -n "$SCHEMA_SQL_FILE" ] && [ -f "$SCHEMA_SQL_FILE" ]; then
    echo "Applying schema SQL: $SCHEMA_SQL_FILE"
    gosu postgres "$PSQL" -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" -f "$SCHEMA_SQL_FILE"
  fi

  if [ -d "$INIT_SQL_DIR" ]; then
    for sql_file in "$INIT_SQL_DIR"/*.sql; do
      [ -e "$sql_file" ] || continue
      echo "Applying init SQL: $sql_file"
      gosu postgres "$PSQL" -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" -f "$sql_file"
    done
  fi

  if [ -n "$SEED_SQL_FILE" ] && [ -f "$SEED_SQL_FILE" ]; then
    echo "Applying seed SQL: $SEED_SQL_FILE"
    gosu postgres "$PSQL" -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" -f "$SEED_SQL_FILE"
  fi
fi

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"

node /app/backend/index.js &
BACKEND_PID=$!

trap 'kill "$BACKEND_PID" 2>/dev/null || true; gosu postgres "$PG_CTL" -D "$PGDATA" -m fast stop 2>/dev/null || true' INT TERM

nginx -g 'daemon off;' &
NGINX_PID=$!

wait "$NGINX_PID"
kill "$BACKEND_PID" 2>/dev/null || true
gosu postgres "$PG_CTL" -D "$PGDATA" -m fast stop 2>/dev/null || true
