<p align="center">
  <img src="https://via.placeholder.com/100x100/FFCC00/0f172a?text=C" alt="Circus Backend" width="100" />
</p>

<h2 align="center">Circus - Backend API</h2>

---

## About

Laravel API for Circus platform - Regional taxi-brousse booking system in Madagascar.

### Tech Stack

- Laravel 11
- PostgreSQL
- Laravel Sanctum (Authentication)

### Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Available Modules

| Module | Description |
|--------|-------------|
| Authentication | User login, registration, logout |
| Trips | Trip management for drivers |
| Dashboard | KPIs and statistics |
| Bus | Bus fleet management |

---

## License

MIT © Circus
