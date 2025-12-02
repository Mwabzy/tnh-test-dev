#!/bin/bash
export ENV_FILE=.prod.env
cd /app

# Check if a process type argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: start.sh [PROCESS_TYPE] (backend)"
    exit 1
fi

PROCESS_TYPE=$1

if [ "$PROCESS_TYPE" = "backend" ]; then
    echo ""
    echo "........................................Starting in PRODUCTION Mode..................................................."
    echo ""
    echo "Using env file: $ENV_FILE"

    # Run Gunicorn with production settings
    gunicorn \
        --bind 0.0.0.0:8080 \
        --workers 3 \
        --worker-class gthread \
        --log-level INFO \
        --access-logfile "-" \
        --error-logfile "-" \
        core.wsgi:application
fi
