import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const body = await req.json();
  const message = await prisma.contactMessage.update({
    where: { id },
    data: { isRead: body.isRead },
  });
  return NextResponse.json(message);
}
