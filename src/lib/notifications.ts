import nodemailer from "nodemailer";

// ─── Email Transporter ────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// ─── WhatsApp via callmebot ───────────────────────────────────
async function sendWhatsApp(phone: string, message: string, apiKey: string) {
  const encoded = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encoded}&apikey=${apiKey}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    return res.ok;
  } catch { return false; }
}

// ─── Beautiful HTML Email Template ───────────────────────────
function buildPatientEmailHtml(data: {
  appointmentNo: string;
  patientName: string;
  department: string;
  doctor?: string;
  visitDate: string;
  visitTime: string;
  consultationType: string;
  complaint?: string;
  hospitalName: string;
  hospitalPhone: string;
  hospitalAddress: string;
  hospitalWa: string;
}) {
  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Konfirmasi Janji Temu</title></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:linear-gradient(135deg,#0b4f8a 0%,#1a7cc7 100%);padding:40px 48px;text-align:center;">
        <h1 style="color:white;margin:0;font-size:28px;font-weight:700;">🏥 RS Sehat Medika</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Konfirmasi Janji Temu</p>
      </td></tr>
      <tr><td style="background:#ecfdf5;padding:20px 48px;text-align:center;border-bottom:1px solid #d1fae5;">
        <p style="color:#065f46;font-weight:600;margin:0;font-size:16px;">✅ Janji Temu Anda Berhasil Dibuat!</p>
      </td></tr>
      <tr><td style="padding:40px 48px;">
        <p style="color:#374151;font-size:15px;line-height:1.6;">Halo, <strong>${data.patientName}</strong>! 👋</p>
        <p style="color:#374151;font-size:15px;line-height:1.6;">Janji temu Anda di <strong>${data.hospitalName}</strong> telah berhasil terdaftar.</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin:24px 0;">
          <tr><td colspan="2" style="padding-bottom:16px;">
            <span style="background:#0b4f8a;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">NO. PENDAFTARAN: ${data.appointmentNo}</span>
          </td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;width:160px;">👤 Nama Pasien</td><td style="padding:6px 0;color:#111827;font-weight:600;font-size:14px;">${data.patientName}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">🏥 Departemen</td><td style="padding:6px 0;color:#111827;font-weight:600;font-size:14px;">${data.department}</td></tr>
          ${data.doctor ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">👨‍⚕️ Dokter</td><td style="padding:6px 0;color:#111827;font-weight:600;font-size:14px;">${data.doctor}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">📅 Tanggal</td><td style="padding:6px 0;color:#111827;font-weight:600;font-size:14px;">${data.visitDate}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">⏰ Waktu</td><td style="padding:6px 0;color:#111827;font-weight:600;font-size:14px;">${data.visitTime}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">🩺 Jenis</td><td style="padding:6px 0;color:#111827;font-weight:600;font-size:14px;">${data.consultationType}</td></tr>
          ${data.complaint ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px;vertical-align:top;">📝 Keluhan</td><td style="padding:6px 0;color:#111827;font-size:14px;">${data.complaint}</td></tr>` : ''}
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border-radius:12px;padding:20px 24px;border:1px solid #fde68a;margin:16px 0;">
          <tr><td>
            <p style="color:#92400e;font-weight:700;font-size:14px;margin:0 0 12px;">⚠️ Hal Penting:</p>
            <ul style="color:#78350f;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
              <li>Harap tiba <strong>15 menit sebelum</strong> waktu yang dijadwalkan</li>
              <li>Bawa <strong>KTP/SIM/Paspor</strong> yang masih berlaku</li>
              <li>Bawa <strong>kartu BPJS/asuransi kesehatan</strong> (jika ada)</li>
              <li>Bawa <strong>hasil pemeriksaan sebelumnya</strong> (jika ada)</li>
            </ul>
          </td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
          <tr>
            <td align="center" style="padding:0 8px;">
              <a href="https://wa.me/${data.hospitalWa}" style="display:inline-block;background:#25d366;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">💬 Chat via WhatsApp</a>
            </td>
            <td align="center" style="padding:0 8px;">
              <a href="tel:${data.hospitalPhone}" style="display:inline-block;background:#0b4f8a;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">📞 Hubungi Kami</a>
            </td>
          </tr>
        </table>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:24px 48px;border-top:1px solid #e2e8f0;">
        <p style="color:#6b7280;font-size:13px;text-align:center;margin:0 0 8px;"><strong style="color:#374151;">${data.hospitalName}</strong></p>
        <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0;">📍 ${data.hospitalAddress} &nbsp;|&nbsp; 📞 ${data.hospitalPhone}</p>
        <p style="color:#9ca3af;font-size:12px;text-align:center;margin:8px 0 0;">Email ini dikirim otomatis. Mohon tidak membalas email ini.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function buildAdminEmailHtml(data: {
  appointmentNo: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  department: string;
  visitDate: string;
  visitTime: string;
  consultationType: string;
  complaint?: string;
  createdAt: string;
}) {
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><title>Janji Temu Baru</title></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:linear-gradient(135deg,#dc2626 0%,#ef4444 100%);padding:32px 48px;text-align:center;">
        <h1 style="color:white;margin:0;font-size:24px;">🔔 Janji Temu Baru Masuk!</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Segera konfirmasi kepada pasien</p>
      </td></tr>
      <tr><td style="padding:32px 48px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:24px;border:1px solid #e2e8f0;">
          <tr><td style="padding:6px 0;color:#6b7280;width:160px;">No. Pendaftaran</td><td style="font-weight:700;color:#0b4f8a;">${data.appointmentNo}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Nama Pasien</td><td style="font-weight:600;">${data.patientName}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">No. HP</td><td><a href="tel:${data.patientPhone}" style="color:#0b4f8a;">${data.patientPhone}</a></td></tr>
          ${data.patientEmail ? `<tr><td style="padding:6px 0;color:#6b7280;">Email</td><td>${data.patientEmail}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#6b7280;">Departemen</td><td>${data.department}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Tanggal</td><td style="font-weight:600;color:#065f46;">${data.visitDate}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Waktu</td><td>${data.visitTime}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Jenis</td><td>${data.consultationType}</td></tr>
          ${data.complaint ? `<tr><td style="padding:6px 0;color:#6b7280;vertical-align:top;">Keluhan</td><td style="font-style:italic;">${data.complaint}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#6b7280;">Waktu Daftar</td><td style="color:#6b7280;font-size:13px;">${data.createdAt}</td></tr>
        </table>
        <p style="text-align:center;margin:24px 0 0;">
          <a href="http://localhost:3000/admin/appointments" style="display:inline-block;background:#0b4f8a;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Buka Admin Dashboard →</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

function buildPatientWaMessage(data: {
  appointmentNo: string;
  patientName: string;
  department: string;
  visitDate: string;
  visitTime: string;
  hospitalName: string;
  hospitalPhone: string;
}) {
  return `🏥 *${data.hospitalName}*
━━━━━━━━━━━━━━━━━
✅ *KONFIRMASI JANJI TEMU*

Halo *${data.patientName}*! 👋

Janji temu Anda telah berhasil terdaftar:

📋 No. Pendaftaran: *${data.appointmentNo}*
🏥 Departemen: *${data.department}*
📅 Tanggal: *${data.visitDate}*
⏰ Waktu: *${data.visitTime}*

⚠️ *Persiapan:*
• Hadir 15 menit lebih awal
• Bawa KTP & kartu asuransi/BPJS
• Bawa rekam medis sebelumnya (jika ada)

📞 Info: *${data.hospitalPhone}*

_Terima kasih telah mempercayakan kesehatan Anda kepada kami._ 🙏`;
}

function buildAdminWaMessage(data: {
  appointmentNo: string;
  patientName: string;
  patientPhone: string;
  department: string;
  visitDate: string;
  visitTime: string;
}) {
  return `🔔 *JANJI TEMU BARU MASUK*
━━━━━━━━━━━━━━━
📋 No: *${data.appointmentNo}*
👤 Pasien: *${data.patientName}*
📱 HP: ${data.patientPhone}
🏥 Dept: ${data.department}
📅 ${data.visitDate} | ⏰ ${data.visitTime}

Segera konfirmasi ke pasien! ✅`;
}

export async function sendAppointmentNotifications(appointment: {
  appointmentNo: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  department: string;
  doctor?: string;
  visitDate: string;
  visitTime: string;
  consultationType: string;
  complaint?: string;
}) {
  const hospitalName = process.env.HOSPITAL_NAME || "RS Sehat Medika";
  const hospitalPhone = process.env.HOSPITAL_PHONE || "(021) 5566-7788";
  const hospitalAddress = process.env.HOSPITAL_ADDRESS || "Jakarta";
  const hospitalWa = process.env.HOSPITAL_WA || "6221556677";
  const adminEmail = process.env.EMAIL_ADMIN || "admin@rssehatmedika.com";
  const waApiKey = process.env.WA_API_KEY || "";
  const waAdminPhone = process.env.WA_ADMIN_PHONE || "";

  const results = { emailPatient: false, emailAdmin: false, waPatient: false, waAdmin: false };

  if (appointment.patientEmail && process.env.EMAIL_USER) {
    try {
      await transporter.sendMail({
        from: `"${hospitalName}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: appointment.patientEmail,
        subject: `✅ Konfirmasi Janji Temu No. ${appointment.appointmentNo} – ${hospitalName}`,
        html: buildPatientEmailHtml({ ...appointment, hospitalName, hospitalPhone, hospitalAddress, hospitalWa }),
      });
      results.emailPatient = true;
    } catch (e) { console.error("Patient email failed:", e); }
  }

  if (process.env.EMAIL_USER) {
    try {
      await transporter.sendMail({
        from: `"${hospitalName}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `🔔 Janji Temu Baru: ${appointment.patientName} – ${appointment.department}`,
        html: buildAdminEmailHtml({ ...appointment, createdAt: new Date().toLocaleString("id-ID") }),
      });
      results.emailAdmin = true;
    } catch (e) { console.error("Admin email failed:", e); }
  }

  if (waApiKey && appointment.patientPhone) {
    const msg = buildPatientWaMessage({ ...appointment, hospitalName, hospitalPhone });
    results.waPatient = await sendWhatsApp(appointment.patientPhone, msg, waApiKey);
  }

  if (waApiKey && waAdminPhone) {
    const msg = buildAdminWaMessage(appointment);
    results.waAdmin = await sendWhatsApp(waAdminPhone, msg, waApiKey);
  }

  return results;
}

export function generateAppointmentNo(): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RSM-${y}${m}${d}-${rand}`;
}
