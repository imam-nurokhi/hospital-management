import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get("departmentId");
    const doctors = await prisma.doctor.findMany({
      where: { isAvailable: true, ...(departmentId ? { departmentId } : {}) },
      include: { department: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(doctors);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
