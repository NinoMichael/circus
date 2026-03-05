FROM php:8.3-fpm

# Installer dépendances système et nginx
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    nginx \
    procps \
    supervisor \
    && apt-get clean

# Installer extensions PHP
RUN docker-php-ext-install pdo pdo_pgsql bcmath

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copier le projet
COPY . /var/www

# Installer dépendances Laravel
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Copier Nginx et start script
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]