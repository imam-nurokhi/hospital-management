import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const cookieStore = await cookies();
    cookieStore.set("admin_session", admin.id, { httpOnly: true, maxAge: 86400, path: "/" });
    return NextResponse.json({ success: true, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
