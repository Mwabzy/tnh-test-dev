
#!/bin/bash

# Exit on error (equivalent to set -o errexit)
set -e

postgres_ready() {
    python << END
import sys
from psycopg import connect
from psycopg.errors import OperationalError

try:
    connect(
        dbname="${POSTGRES_DATABASE}",
        user="${POSTGRES_USER}",
        password="${POSTGRES_PASSWORD}",
        host="${POSTGRES_HOST}",
        port="${POSTGRES_PORT}",
    ).close()
except OperationalError:
    sys.exit(-1)
END
}

until postgres_ready; do
    echo "Waiting for PostgreSQL to become available..." >&2
    sleep 5
done
echo "PostgreSQL is available" >&2

# Only run migrations on the backend service
if [ "$1" = "/app/dockerprod/django/start.sh" ] && [ "$2" = "backend" ]; then
    if ! python3 manage.py makemigrations --check --dry-run | grep -q "No changes detected"; then
        echo "Detected changes in models, running makemigrations..."
        python3 manage.py makemigrations
    else
        echo "No model changes detected, skipping makemigrations."
    fi
    python3 manage.py migrate --noinput
    echo "Collecting static files..."
    python3 manage.py collectstatic --noinput
fi

exec "$@"