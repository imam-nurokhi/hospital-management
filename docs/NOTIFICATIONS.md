# Notification System Setup

The application supports two notification channels:
1. **Email** via Nodemailer (Gmail SMTP)
2. **WhatsApp** via callmebot.com free API

---

## 📧 Email Setup (Gmail SMTP)

### Step 1: Enable Gmail App Password

1. Go to your Google Account → Security
2. Enable **2-Step Verification** if not already enabled
3. Go to **App Passwords** (search in Google Account settings)
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### Step 2: Configure .env

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="xxxx xxxx xxxx xxxx"   # 16-char app password
EMAIL_FROM="noreply@rssehatmedika.com"
EMAIL_ADMIN="admin@rssehatmedika.com"
```

### What Gets Sent

**To Patient (if email provided):**
- Beautiful HTML email with appointment details
- Preparation checklist
- WhatsApp and phone CTA buttons

**To Admin:**
- Notification email with full patient details
- Link to admin dashboard

---

## 💬 WhatsApp Setup (callmebot.com)

> **Free API** – No account required, works for personal WhatsApp numbers.

### Step 1: Activate callmebot for Your Number

1. Add **+34 644 57 85 22** to your WhatsApp contacts as "CallMeBot"
2. Send this message to that number:
   ```
   I allow callmebot to send me messages
   ```
3. You'll receive an API key reply like: `Your API key is: 12345678`

### Step 2: Configure .env

```env
WA_API_KEY="12345678"           # API key from callmebot
WA_ADMIN_PHONE="628123456789"   # Admin WhatsApp number (intl format, no +)
```

### Phone Number Format

Use international format without `+`:
- Indonesia: `628123456789` (62 + 8123456789)
- US: `112025551234` (1 + 12025551234)

### What Gets Sent

**To Patient:**
```
�� RS Sehat Medika
━━━━━━━━━━━━━━━━━
✅ KONFIRMASI JANJI TEMU

Halo [Name]! 👋
No. Pendaftaran: RSM-240401-1234
Departemen: Kardiologi
Tanggal: Senin, 15 April 2024
Waktu: Pagi (08:00-12:00)
...
```

**To Admin:**
```
🔔 JANJI TEMU BARU MASUK
📋 No: RSM-240401-1234
👤 Pasien: Budi Hartono
📱 HP: 081234567890
🏥 Dept: Kardiologi
📅 15 Apr 2024 | ⏰ Pagi
```

### Limitations

- callmebot has rate limits (~20 messages/day per number)
- For production use, consider upgrading to a paid WA Business API

---

## 🔒 Production Notes

1. Use environment variables, never hardcode credentials
2. For production email, use a dedicated SMTP service (SendGrid, Postmark, AWS SES)
3. For production WhatsApp, use official WhatsApp Business API
4. All notification failures are caught silently (don't block appointment creation)
