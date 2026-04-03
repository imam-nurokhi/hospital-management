# Database Schema

PostgreSQL database: `hospital_sehat`

## Models

### Department
Medical department / specialist clinic.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| name | String | Department name |
| slug | String | URL-friendly unique identifier |
| description | String? | Short description |
| icon | String? | Emoji icon |
| color | String? | Hex color code |
| isActive | Boolean | Default: true |
| createdAt | DateTime | Auto-set |

### Doctor
Doctor profile.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| name | String | Full name with title |
| slug | String | Unique URL slug |
| speciality | String | Medical specialty |
| bio | String? | Biography |
| photo | String? | Photo URL |
| education | String? | Education background |
| experience | Int? | Years of experience |
| rating | Float | Default: 4.5 |
| isAvailable | Boolean | Default: true |
| schedule | Json? | Weekly schedule object |
| departmentId | String | FK → Department |

### Patient
Registered patient.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| name | String | Full name |
| phone | String | Phone number |
| email | String? | Email address |
| dateOfBirth | DateTime? | Date of birth |
| address | String? | Address |
| bloodType | String? | Blood type |
| medicalNo | String? | Unique medical record number |

### Appointment
Appointment booking.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| appointmentNo | String | Unique no. (RSM-YYMMDD-XXXX) |
| patientName | String | Patient name |
| patientPhone | String | Contact phone |
| patientEmail | String? | Contact email |
| departmentId | String | FK → Department |
| doctorId | String? | FK → Doctor (optional) |
| visitDate | DateTime | Appointment date |
| visitTime | String | Time slot string |
| consultationType | String | Type of visit |
| complaint | String? | Patient complaint |
| status | Enum | PENDING/CONFIRMED/COMPLETED/CANCELLED |
| emailSent | Boolean | Email notification sent |
| waSent | Boolean | WhatsApp notification sent |

### AppointmentStatus Enum
- `PENDING` – Awaiting confirmation
- `CONFIRMED` – Confirmed by admin
- `COMPLETED` – Visit completed
- `CANCELLED` – Appointment cancelled

### ContactMessage
Website contact form submission.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| name | String | Sender name |
| email | String | Sender email |
| subject | String? | Message subject |
| message | String | Message content |
| isRead | Boolean | Default: false |

### News
Health articles and news.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| title | String | Article title |
| slug | String | Unique URL slug |
| excerpt | String | Short summary |
| content | String | Full content |
| category | String | Medical category |
| author | String | Author name |
| publishedAt | DateTime | Publication date |
| isPublished | Boolean | Default: true |

### AdminUser
Admin user account.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| name | String | Admin name |
| email | String | Unique email |
| password | String | bcrypt hashed |
| role | String | Default: "ADMIN" |
