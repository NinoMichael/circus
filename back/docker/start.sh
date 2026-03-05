#!/bin/bash

PORT=${PORT:-80}

# Générer la config nginx
envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Corriger les permissions Laravel
mkdir -p /var/www/storage/logs
chmod -R 777 /var/www/storage
chmod -R 777 /var/www/bootstrap/cache

# Nettoyer les caches
php artisan config:clear
php artisan cache:clear

# Lancer PHP-FPM
php-fpm &

# Lancer nginx
nginx -g "daemon off;"