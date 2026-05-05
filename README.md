# FieldTrack

A field employee tracking and customer visit management system built with Laravel, Inertia.js, and React.

## Features

- Employee attendance tracking with geolocation
- Customer visit logging
- Manager dashboard with analytics
- Employee dashboard for daily tasks
- Role-based access control (Manager / Employee)

## Tech Stack

- **Backend:** Laravel 13 (PHP 8.4)
- **Frontend:** React 18 + Inertia.js
- **Styling:** Tailwind CSS
- **Database:** SQLite (local)
- **Build Tool:** Vite

## Prerequisites

- PHP >= 8.4
- Composer
- Node.js >= 18

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fieldtrack
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Set up environment

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Set up the database

```bash
touch database/database.sqlite
php artisan migrate
```

### 5. Seed the database (optional)

```bash
php artisan db:seed
```

## Running the Application

```bash
npm run start
```

This starts the Laravel server, Vite dev server, queue worker, and log viewer all at once. Open `http://localhost:8000` in your browser.

## User Roles

- **Manager** — full access to analytics, employee management, and reports
- **Employee** — attendance tracking and customer visit logging

## Common Issues

**Port already in use**
```bash
php artisan serve --port=8080
```

**Database errors**
```bash
touch database/database.sqlite
php artisan migrate:fresh
```

**Vite / node_modules issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

MIT
