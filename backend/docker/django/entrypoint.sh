# Exit on error (equivalent to set -o errexit)
set -e

postgres_ready() {
    python << END
import sys
import os
from psycopg import connect
from psycopg.errors import OperationalError

try:
    database_url = os.environ.get("DATABASE_URL")
    local_dev = os.environ.get("LOCAL_DEV", "True").lower() in ("true", "1", "yes")
    
    if local_dev and database_url:
        # Use DATABASE_URL for local development
        connect(database_url).close()
    else:
        # Use individual connection parameters
        connect(
            dbname=os.environ.get("POSTGRES_DATABASE"),
            user=os.environ.get("POSTGRES_USER"),
            password=os.environ.get("POSTGRES_PASSWORD"),
            host=os.environ.get("POSTGRES_HOST"),
            port=os.environ.get("POSTGRES_PORT"),
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
    echo "Collecting static files..."
    python3 manage.py collectstatic --noinput
fi

exec "$@"