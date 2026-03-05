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
    gettext-base \
    && apt-get clean

# Installer extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_pgsql bcmath

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copier le projet
COPY . /var/www

# Installer dépendances Laravel
RUN composer install --no-dev --optimize-autoloader

# Copier Nginx template et script de démarrage
COPY docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]