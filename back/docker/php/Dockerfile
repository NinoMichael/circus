FROM php:8.3-fpm

# Install dependencies system
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
    gettext-base \
    && apt-get clean

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project
COPY . /var/www

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts
RUN php artisan package:discover

RUN mkdir -p storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Copy Nginx template and startup script
COPY docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]