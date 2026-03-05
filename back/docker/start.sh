#!/bin/bash

# Remplacer le port dans Nginx
envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Permissions Laravel
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Lancer PHP-FPM en arrière-plan
php-fpm &

# Lancer Nginx au premier plan
nginx -g "daemon off;"