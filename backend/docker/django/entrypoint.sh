until postgres_ready; do
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
if [ "$1" = "/app/docker/django/start.sh" ] && [ "$2" = "backend" ]; then
    if ! python3 manage.py makemigrations --check --dry-run | grep -q "No changes detected"; then
        echo "Detected changes in models, running makemigrations..."
        python3 manage.py makemigrations
    else
        echo "No model changes detected, skipping makemigrations."
    fi
    python3 manage.py migrate --noinput
    # echo "Creating system profiles"
    # python3 manage.py setup_profiles
    # if [ "$DEBUG" == "True" ]; then
    #     if [ -f "/app/db.json" ]; then
    #       echo "Loading dummy database..."
    #       python3 manage.py load_fixtures
    #     else
    #       echo "Looks like there is no dummy database or fixture to load..."
    #     fi
    # else
    #   echo "This is not a drill...."
    # fi
    # echo "Assign super user the admin profile"
    # python3 manage.py assign_admin_profile
    echo "Collecting static files..."
    python3 manage.py collectstatic --noinput
fi

exec "$@"