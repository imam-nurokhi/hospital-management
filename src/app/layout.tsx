import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RS Sehat Medika – Kesehatan Terbaik untuk Keluarga Anda",
  description: "Rumah Sakit Terpercaya dengan Pelayanan Medis Terbaik, Dokter Spesialis Berpengalaman, dan Fasilitas Modern.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
