# Base image PHP-FPM
FROM php:8.3-fpm

# Installer dépendances système
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

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define work directory
WORKDIR /var/www

# Copy all project
COPY . /var/www

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Copy Nginx template and create startup script
COPY docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

# Render command
CMD ["/start.sh"]