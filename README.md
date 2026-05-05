# FieldTrack

A field employee tracking and customer visit management system built with Laravel, Inertia.js, and React.

## Features

- Employee attendance tracking with geolocation
- Customer visit logging
- Manager dashboard with analytics
- Employee dashboard for daily tasks
- Real-time location tracking
- Role-based access control (Manager/Employee)

## Tech Stack

- **Backend:** Laravel 13 (PHP 8.4)
- **Frontend:** React 18 + Inertia.js
- **Styling:** Tailwind CSS 4
- **Database:** SQLite (local) / PostgreSQL (production)
- **Build Tool:** Vite 8

## Prerequisites

- PHP >= 8.4
- Composer
- Node.js >= 18
- SQLite (for local development)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fieldtrack
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node dependencies

```bash
npm install
```

### 4. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and configure:
- `APP_NAME=FieldTrack`
- `DB_CONNECTION=sqlite` (default for local development)
- Add your `GOOGLE_MAPS_API_KEY` if using maps features

### 5. Generate application key

```bash
php artisan key:generate
```

### 6. Create database and run migrations

```bash
touch database/database.sqlite
php artisan migrate
```

### 7. Seed the database (optional)

```bash
php artisan db:seed
```

## Running the Application

### Development Mode

Run both Laravel and Vite dev servers concurrently:

```bash
npm run start
```

This starts:
- Laravel server at `http://localhost:8000`
- Vite dev server with HMR
- Queue worker
- Log viewer (Pail)

Or run them separately:

**Terminal 1 - Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite:**
```bash
npm run dev
```

### Production Build

Build frontend assets for production:

```bash
npm run build
```

Then serve with:

```bash
php artisan serve
```

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/      # API and page controllers
│   │   └── Middleware/        # Role-based middleware
│   └── Models/                # Eloquent models
├── database/
│   ├── migrations/            # Database migrations
│   └── seeders/               # Database seeders
├── resources/
│   ├── js/
│   │   ├── Components/        # Reusable React components
│   │   ├── Layouts/           # Page layouts
│   │   └── Pages/             # Inertia pages
│   └── css/                   # Tailwind styles
└── routes/
    └── web.php                # Application routes
```

## Available Routes

- `/` - Welcome page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Role-based dashboard redirect
- `/employee/dashboard` - Employee dashboard
- `/manager/dashboard` - Manager dashboard

## User Roles

- **Manager:** Full access to analytics, employee management, and reports
- **Employee:** Access to attendance tracking and customer visit logging

## Testing

Run tests:

```bash
php artisan test
```

## Deployment

### Railway / Render

See deployment guides in the `docs/` folder for platform-specific instructions.

### Environment Variables for Production

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
DB_CONNECTION=pgsql
DB_URL=postgresql://user:pass@host:5432/dbname
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

## Common Issues

### Port already in use
If port 8000 is busy, specify a different port:
```bash
php artisan serve --port=8080
```

### Database connection errors
Ensure `database/database.sqlite` exists:
```bash
touch database/database.sqlite
php artisan migrate:fresh
```

### Vite build errors
Clear node modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
