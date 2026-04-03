# RS Sehat Medika – Hospital Management System

A full-stack hospital website built with Next.js 16, TypeScript, PostgreSQL, and Prisma. Features online appointment booking with WhatsApp and Email notifications.

## ✨ Features

- **Online Appointment Booking** – Patients can book appointments, receive confirmation via Email & WhatsApp
- **14 Medical Departments** – Full department management with doctor assignment
- **Doctor Profiles** – Specialization, availability, rating, and schedule
- **Admin Dashboard** – Manage appointments, patients, doctors, and contact messages
- **WhatsApp Notifications** – Automated WA messages via callmebot.com API
- **Email Notifications** – Beautiful HTML email templates via Nodemailer/Gmail SMTP
- **Responsive Design** – Mobile-first design with Tailwind CSS
- **Real-time Stats** – Live patient and appointment statistics

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 + TypeScript | Full-stack framework |
| PostgreSQL | Database |
| Prisma 7 | ORM with pg adapter |
| Tailwind CSS v4 | Styling |
| Nodemailer | Email notifications |
| callmebot.com | WhatsApp notifications |
| bcryptjs | Password hashing |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (running locally)
- npm

### Installation

```bash
git clone <repo-url>
cd hospital-management
npm install
```

### Environment Setup

Copy `.env` and update with your credentials:
```bash
cp .env .env.local
# Edit .env with your actual values
```

### Database Setup

```bash
# Create database
createdb -U postgres hospital_sehat

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@rssehatmedika.com | admin123456 |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page (all sections)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── admin/
│   │   ├── layout.tsx        # Admin layout with sidebar
│   │   ├── page.tsx          # Dashboard overview
│   │   ├── appointments/     # Appointment management
│   │   ├── patients/         # Patient list
│   │   ├── doctors/          # Doctor profiles
│   │   ├── messages/         # Contact messages
│   │   └── login/            # Admin login
│   └── api/
│       ├── appointments/     # Appointment CRUD
│       ├── departments/      # Department list
│       ├── doctors/          # Doctor list
│       ├── stats/            # Aggregate statistics
│       ├── contact/          # Contact messages
│       ├── news/             # News articles
│       └── admin/            # Admin auth
├── components/
│   ├── Navbar.tsx            # Site navigation
│   ├── AppointmentForm.tsx   # Booking form
│   ├── AdminSidebar.tsx      # Admin navigation
│   └── ClientInit.tsx        # Client-side initialization
└── lib/
    ├── prisma.ts             # Database client
    └── notifications.ts      # Email & WhatsApp
```

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (GUI)
```

## 🔧 Configuration

See [SETUP.md](docs/SETUP.md) for detailed configuration.

## 📨 Notifications

See [NOTIFICATIONS.md](docs/NOTIFICATIONS.md) for WhatsApp and Email setup.

## 🗄 Database

See [DATABASE.md](docs/DATABASE.md) for schema documentation.

## 📡 API

See [API.md](docs/API.md) for API endpoint documentation.
