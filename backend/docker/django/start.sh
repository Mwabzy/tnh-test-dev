#!/bin/sh

cd /app

if [ $# -eq 0 ]; then
    echo "Usage: start.sh [PROCESS_TYPE](backend)"
    exit 1
fi

PROCESS_TYPE=$1

chmod +x /app/docker/django/wait-for-it.sh

DB_HOST=$(echo $DATABASE_URL | sed -E 's#postgresql://[^:]+:[^@]+@([^:/]+):([0-9]+)/.*#\1#')
DB_PORT=$(echo $DATABASE_URL | sed -E 's#postgresql://[^:]+:[^@]+@([^:/]+):([0-9]+)/.*#\2#')


echo "Waiting for postgres to be ready at $DB_HOST:$DB_PORT..."
/app/docker/django/wait-for-it.sh $DB_HOST:$DB_PORT --timeout=30 --strict -- echo "Postgres is up!"


if [ "$PROCESS_TYPE" = "backend" ]; then
    echo "Running migrations..."
    python manage.py migrate
    
    if [ "$DEBUG" = "True" ]; then
        echo ""
        echo "........................................Starting in DEBUG Mode......................................................."
        echo ""
        python manage.py runserver \
            0.0.0.0:8000
    fi
fi