#!/bin/sh

cd /app

if [ $# -eq 0 ]; then
    echo "Usage: start.sh [PROCESS_TYPE](backend)"
    exit 1
fi

PROCESS_TYPE=$1


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