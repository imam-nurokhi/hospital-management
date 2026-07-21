import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "RS Bisadibicarakan – Rumah Sakit Modern untuk Keluarga Anda",
    template: "%s | RS Bisadibicarakan",
  },
  description: "RS Bisadibicarakan adalah rumah sakit modern dengan layanan dokter spesialis, Medical Check-Up, IGD 24 jam, rawat jalan, rawat inap, dan fasilitas kesehatan digital.",
  applicationName: "RS Bisadibicarakan HIS",
  keywords: [
    "RS Bisadibicarakan",
    "rumah sakit modern",
    "medical check up",
    "dokter spesialis",
    "IGD 24 jam",
    "hospital information system",
  ],
  authors: [{ name: "RS Bisadibicarakan" }],
  creator: "RS Bisadibicarakan",
  publisher: "RS Bisadibicarakan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "RS Bisadibicarakan",
    title: "RS Bisadibicarakan – Rumah Sakit Modern untuk Keluarga Anda",
    description: "Layanan kesehatan komprehensif, dokter spesialis, MCU, IGD 24 jam, dan dashboard kesehatan digital untuk keluarga Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RS Bisadibicarakan – Rumah Sakit Modern",
    description: "Rumah sakit modern dengan layanan kesehatan komprehensif untuk keluarga Anda.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
