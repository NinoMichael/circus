#!/bin/bash

# Use the PORT environment variable if defined, otherwise default to 80
PORT=${PORT:-80}

# Replace the $PORT placeholder in the nginx configuration template
# and generate the final nginx configuration file
envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Ensure the Laravel logs directory exists and give full permissions
mkdir -p /var/www/storage/logs

# FIX permissions
chown -R www-data:www-data /var/www/storage
chown -R www-data:www-data /var/www/bootstrap/cache

chmod -R 777 /var/www/storage
chmod -R 777 /var/www/bootstrap/cache

# Clear Laravel caches (config, route, view, etc.)
# If the command fails, ignore the error and continue
php artisan optimize:clear || true

php-fpm &

# Start nginx in the foreground so the container keeps running
nginx -g "daemon off;"