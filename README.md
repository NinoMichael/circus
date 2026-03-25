<h1 align="center">Circus</h1>

<p align="center">
  <strong>Regional Bus Booking Platform in Madagascar</strong>
</p>

<p align="center">
  A complete digital solution for booking and managing regional bus trips
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-yellow" alt="Version" />
  <img src="https://img.shields.io/badge/status-under%20development-blue" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

---

## About

**Circus** is a modern web platform for booking regional bus trips in Madagascar. It provides a seamless experience for passengers to book their journeys, along with a comprehensive dashboard for drivers and cooperative managers.

### Key Features

| Module                      | Description                                                       |
| --------------------------- | ----------------------------------------------------------------- |
| 🚗 **Driver Space**         | Trip management, passenger boarding, revenue tracking             |
| 🛒 **Booking**              | Seat reservation, seat selection, online payment                  |
| 🗺️ **Planning**             | Route creation and management with departure and arrival stations |
| 📊 **Dashboard**            | Performance tracking, occupancy statistics, revenue analytics     |
| 📱 **Responsive Interface** | Accessible on all devices                                         |

---

## Architecture

The project is organized into two distinct parts:

```
circus/
├── front/          # React + Vite Application
├── back/           # Laravel API
```

### Tech Stack

- **Frontend** : React 19, Vite, TailwindCSS, Material UI, Framer Motion, Chart.js
- **Backend** : Laravel 11, PHP 8+, PostgreSQL
- **Auth** : Laravel Sanctum (JWT)

---

## User Roles

| Role               | Access                                   |
| ------------------ | ---------------------------------------- |
| 👤 **Passenger**   | Booking, payment, history                |
| 🚐 **Driver**      | Planning, boarding, revenue, performance |
| 🏢 **Cooperative** | Fleet management, drivers, statistics    |
| ⚙️ **Admin**       | Global platform management               |

---

## Getting Started

### Prerequisites

- PHP 8.2+
- Node.js 18+
- PostgreSQL 14+
- Composer

### Backend

```bash
cd back
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend

```bash
cd front
npm install
npm run dev
```

---

## Screenshots

_Coming soon..._

---

## Contributing

Contributions are welcome! Please read the [LICENSE](LICENSE) file for details.

---

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.

---
