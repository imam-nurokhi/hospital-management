import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const body = await req.json();
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: body.status, notes: body.notes },
    include: { department: true },
  });
  return NextResponse.json(appointment);
}

export async function DELETE(_: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  await prisma.appointment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
