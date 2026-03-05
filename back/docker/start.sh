#!/bin/bash

# Remplacer ${PORT} dans default.conf
envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp && mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf

# Permissions Laravel
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Démarrer PHP-FPM en arrière-plan
php-fpm &

# Démarrer Nginx au premier plan
nginx -g "daemon off;"