#!/bin/bash

# Remplacer le port dans la config Nginx
envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

# Permissions Laravel
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 777 /var/www/storage /var/www/bootstrap/cache

# Démarrer PHP-FPM en arrière-plan
php-fpm &

# Démarrer Nginx au premier plan
nginx -g "daemon off;"