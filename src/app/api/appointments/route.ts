import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAppointmentNotifications, generateAppointmentNo } from "@/lib/notifications";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: { department: true, doctor: true },
      take: 100,
    });
    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientName, patientPhone, patientEmail, patientDob, departmentId, doctorId, visitDate, visitTime, consultationType, complaint } = body;

    if (!patientName || !patientPhone || !departmentId || !visitDate) {
      return NextResponse.json({ error: "Field wajib tidak lengkap" }, { status: 400 });
    }

    const department = await prisma.department.findUnique({ where: { id: departmentId } });
    if (!department) return NextResponse.json({ error: "Departemen tidak ditemukan" }, { status: 400 });

    const doctor = doctorId ? await prisma.doctor.findUnique({ where: { id: doctorId } }) : null;
    const appointmentNo = generateAppointmentNo();

    const appointment = await prisma.appointment.create({
      data: {
        appointmentNo,
        patientName,
        patientPhone,
        patientEmail: patientEmail || null,
        patientDob: patientDob ? new Date(patientDob) : null,
        departmentId,
        doctorId: doctorId || null,
        visitDate: new Date(visitDate),
        visitTime: visitTime || "Pagi (08:00-12:00)",
        consultationType: consultationType || "Rawat Jalan",
        complaint: complaint || null,
        status: "PENDING",
      },
    });

    const visitDateFormatted = new Date(visitDate).toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    sendAppointmentNotifications({
      appointmentNo,
      patientName,
      patientPhone,
      patientEmail,
      department: department.name,
      doctor: doctor?.name,
      visitDate: visitDateFormatted,
      visitTime: visitTime || "Pagi (08:00-12:00)",
      consultationType: consultationType || "Rawat Jalan",
      complaint,
    }).then(results => {
      prisma.appointment.update({
        where: { id: appointment.id },
        data: { emailSent: results.emailPatient || results.emailAdmin, waSent: results.waPatient },
      }).catch(console.error);
    });

    const hospitalWa = process.env.HOSPITAL_WA || "6221556677";
    const waText = encodeURIComponent(`Halo RS Sehat Medika, saya ingin konfirmasi janji temu saya:\n\nNama: ${patientName}\nNo. Pendaftaran: ${appointmentNo}\nDepartemen: ${department.name}\nTanggal: ${visitDateFormatted}\nWaktu: ${visitTime}`);
    const waDeeplink = `https://wa.me/${hospitalWa}?text=${waText}`;

    return NextResponse.json({ success: true, appointmentNo, id: appointment.id, waDeeplink }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Gagal membuat janji temu" }, { status: 500 });
  }
}
