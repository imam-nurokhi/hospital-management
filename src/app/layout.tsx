import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["600", "700", "800"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "RS Sehat Medika – Kesehatan Terbaik untuk Keluarga Anda",
  description: "Rumah Sakit Terpercaya dengan Pelayanan Medis Terbaik, Dokter Spesialis Berpengalaman, dan Fasilitas Modern.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
