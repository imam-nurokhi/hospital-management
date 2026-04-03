# API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

Admin routes are protected by an HTTP-only cookie (`admin_session`) set on login.

---

## 📅 Appointments

### GET /api/appointments
Returns last 100 appointments with department and doctor details.

**Response:**
```json
[
  {
    "id": "clxxx...",
    "appointmentNo": "RSM-240401-1234",
    "patientName": "Budi Hartono",
    "patientPhone": "081234567890",
    "patientEmail": "budi@example.com",
    "department": { "id": "...", "name": "Kardiologi (Jantung)" },
    "doctor": { "id": "...", "name": "dr. Budi Santoso, Sp.JP" },
    "visitDate": "2024-04-15T00:00:00Z",
    "visitTime": "Pagi (08:00-12:00)",
    "consultationType": "Rawat Jalan",
    "status": "PENDING",
    "emailSent": false,
    "waSent": false,
    "createdAt": "2024-04-01T10:00:00Z"
  }
]
```

### POST /api/appointments
Create a new appointment and trigger notifications.

**Request Body:**
```json
{
  "patientName": "Budi Hartono",        // required
  "patientPhone": "081234567890",       // required
  "patientEmail": "budi@example.com",   // optional
  "patientDob": "1990-01-15",           // optional
  "departmentId": "clxxx...",           // required
  "doctorId": "clxxx...",               // optional
  "visitDate": "2024-04-15",            // required
  "visitTime": "Pagi (08:00-12:00)",    // optional
  "consultationType": "Rawat Jalan",    // optional
  "complaint": "Nyeri dada"             // optional
}
```

**Response (201):**
```json
{
  "success": true,
  "appointmentNo": "RSM-240401-1234",
  "id": "clxxx...",
  "waDeeplink": "https://wa.me/6221556677?text=..."
}
```

### PATCH /api/appointments/:id
Update appointment status.

**Request Body:**
```json
{
  "status": "CONFIRMED",  // PENDING | CONFIRMED | COMPLETED | CANCELLED
  "notes": "Confirmed by admin"  // optional
}
```

### DELETE /api/appointments/:id
Delete an appointment.

---

## 🏥 Departments

### GET /api/departments
Returns all active departments sorted alphabetically.

**Response:**
```json
[
  {
    "id": "clxxx...",
    "name": "Anak (Pediatri)",
    "slug": "pediatri",
    "description": "Pelayanan kesehatan anak dari bayi hingga remaja",
    "icon": "🧒",
    "color": "#84cc16",
    "isActive": true
  }
]
```

---

## 👨‍⚕️ Doctors

### GET /api/doctors
### GET /api/doctors?departmentId=clxxx
Returns available doctors, optionally filtered by department.

**Response:**
```json
[
  {
    "id": "clxxx...",
    "name": "dr. Budi Santoso, Sp.JP",
    "speciality": "Kardiologi",
    "experience": 15,
    "rating": 4.9,
    "isAvailable": true,
    "department": { "name": "Kardiologi (Jantung)" }
  }
]
```

---

## 📊 Stats

### GET /api/stats
Returns aggregate statistics.

**Response:**
```json
{
  "patients": 15243,
  "doctors": 8,
  "departments": 14,
  "appointments": 4820
}
```

---

## 📰 News

### GET /api/news
Returns last 6 published news articles.

---

## 📩 Contact

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "Budi Hartono",        // required
  "email": "budi@example.com",   // required
  "subject": "Pertanyaan",       // optional
  "message": "Isi pesan..."      // required
}
```

### GET /api/contact
Returns last 50 contact messages (admin use).

### PATCH /api/contact/:id
Mark message as read.

---

## 🔐 Admin

### POST /api/admin/login
Authenticate admin user. Sets `admin_session` cookie.

**Request Body:**
```json
{
  "email": "admin@rssehatmedika.com",
  "password": "admin123456"
}
```

### POST /api/admin/logout
Clear session cookie.
