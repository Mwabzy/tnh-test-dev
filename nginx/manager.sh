#!/bin/sh
set -e

# Background loop for reloads
(
  while true; do
    echo "🔁 Checking for updated SSL certificates..."
    nginx -t && nginx -s reload && echo "✅ Nginx reloaded with new certificates"
    sleep 3600   # adjust to 1h
  done
) &

echo "🚀 Starting Nginx in foreground..."
exec nginx -g "daemon off;"