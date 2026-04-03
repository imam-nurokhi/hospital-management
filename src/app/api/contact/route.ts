import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Field wajib tidak lengkap" }, { status: 400 });
  }

  await prisma.contactMessage.create({ data: { name, email, subject, message } });

  if (process.env.EMAIL_USER) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      tls: { rejectUnauthorized: false },
    });
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN || process.env.EMAIL_USER,
      subject: `📩 Pesan Baru dari ${name}: ${subject || "Tanpa Subjek"}`,
      html: `<div style="font-family:Arial;padding:20px"><h3>Pesan Baru dari Website</h3><p><b>Dari:</b> ${name} (${email})</p><p><b>Perihal:</b> ${subject}</p><p><b>Pesan:</b><br/>${message}</p></div>`,
    }).catch(console.error);
  }

  return NextResponse.json({ success: true });
}
