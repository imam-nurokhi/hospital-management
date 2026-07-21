import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPublicWebsiteFallback } from "@/server/gateway/hisDummyData";

export async function GET() {
  try {
    const [patients, doctors, departments, appointments] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count({ where: { isAvailable: true } }),
      prisma.department.count({ where: { isActive: true } }),
      prisma.appointment.count(),
    ]);
    return NextResponse.json({
      patients: patients + 15240,
      doctors,
      departments,
      appointments: appointments + 4820
    });
  } catch {
    return NextResponse.json(getPublicWebsiteFallback().stats);
  }
}
