import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateDummyAdminLogin } from "@/server/gateway/hisDummyData";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const dummyAdmin = validateDummyAdminLogin(email, password);
    if (dummyAdmin) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", dummyAdmin.id, { httpOnly: true, maxAge: 86400, path: "/" });
      return NextResponse.json({ success: true, admin: dummyAdmin, mode: "dummy" });
    }

    const [{ prisma }, bcrypt] = await Promise.all([
      import("@/lib/prisma"),
      import("bcryptjs").then((mod) => mod.default),
    ]);
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const cookieStore = await cookies();
    cookieStore.set("admin_session", admin.id, { httpOnly: true, maxAge: 86400, path: "/" });
    return NextResponse.json({ success: true, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error. Pakai demo credentials untuk review FE tanpa DB." }, { status: 500 });
  }
}
