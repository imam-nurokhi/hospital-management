import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPublicWebsiteFallback } from "@/server/gateway/hisDummyData";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" }
    });
    return NextResponse.json(departments);
  } catch {
    return NextResponse.json(getPublicWebsiteFallback().departments);
  }
}
