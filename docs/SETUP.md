# Setup Guide

Complete setup guide for RS Sehat Medika Hospital Management System.

## Prerequisites

- **Node.js 18+** – [Download](https://nodejs.org)
- **PostgreSQL 14+** – [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

## Step 1: Clone & Install

```bash
git clone <repo-url>
cd hospital-management
npm install
```

## Step 2: PostgreSQL Setup

Start PostgreSQL and create the database:

```bash
# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql

# Create database
createdb -U postgres hospital_sehat

# Or using psql:
psql -U postgres -c "CREATE DATABASE hospital_sehat;"
```

## Step 3: Environment Variables

The `.env` file is already created. Update with your values:

```env
# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hospital_sehat?schema=public"

# Email (Gmail SMTP)
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-app-password"   # 16-char Gmail App Password
EMAIL_ADMIN="admin@rssehatmedika.com"

# WhatsApp (callmebot.com)
WA_API_KEY="your-callmebot-api-key"
WA_ADMIN_PHONE="628123456789"
```

See [NOTIFICATIONS.md](NOTIFICATIONS.md) for Email and WhatsApp setup details.

## Step 4: Database Migration & Seed

```bash
# Run migrations (creates tables)
npm run db:migrate

# Seed with sample data (departments, doctors, admin user, news)
npm run db:seed
```

## Step 5: Start Development Server

```bash
npm run dev
```

## Application URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Main website |
| http://localhost:3000/admin | Admin dashboard |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:3000/api/departments | Departments API |
| http://localhost:3000/api/doctors | Doctors API |
| http://localhost:3000/api/stats | Statistics API |

## Default Admin Account

| Field | Value |
|-------|-------|
| Email | admin@rssehatmedika.com |
| Password | admin123456 |

## Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables for Production

Set these in your deployment platform (Vercel, Railway, etc.):
- `DATABASE_URL` – PostgreSQL connection string
- `NEXTAUTH_URL` – Your production URL
- `AUTH_SECRET` – Strong random secret
- Email and WhatsApp credentials

## Database Management

```bash
# View/edit data in browser GUI
npm run db:studio

# Create new migration after schema changes
npm run db:migrate

# Reset database (WARNING: destroys all data)
npx prisma migrate reset
```

## Troubleshooting

### Database connection failed
- Ensure PostgreSQL is running: `pg_isready -U postgres`
- Check DATABASE_URL format in .env

### Build errors
- Run `npx prisma generate` to regenerate Prisma client
- Check Node.js version: `node --version` (requires 18+)

### WhatsApp not working
- Verify you've activated callmebot (see NOTIFICATIONS.md)
- Check phone number format (no +, with country code)
- callmebot may have daily rate limits
