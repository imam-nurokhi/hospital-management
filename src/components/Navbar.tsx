"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#about", label: "Tentang" },
    { href: "#services", label: "Layanan" },
    { href: "#doctors", label: "Dokter" },
    { href: "#facilities", label: "Fasilitas" },
    { href: "#news", label: "Berita" },
    { href: "#contact", label: "Kontak" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-lg backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl shadow-lg transition-colors ${scrolled ? "bg-[#174a7e]" : "bg-[#1a7cc7]"}`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className={`font-black text-xl leading-tight font-poppins ${scrolled ? "text-[#174a7e]" : "text-[#1a1a2e]"}`}>RS Sehat Medika</div>
              <div className={`text-sm font-semibold ${scrolled ? "text-gray-500" : "text-white/45"}`}>Kesehatan Terbaik untuk Anda</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className={`px-5 py-3 rounded-full text-lg font-bold transition-colors hover:bg-white/10 ${scrolled ? "text-gray-700 hover:text-[#174a7e]" : "text-white/90 hover:text-white"}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a href="#appointment" className="hospital-cta hidden items-center gap-3 rounded-full px-8 py-5 text-lg font-black transition-colors sm:flex">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M8 2v2H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2h-4V2H8zm-2 6h12v10H6V8zm5 2v3H8v2h3v3h2v-3h3v-2h-3v-3h-2z"/></svg>
              Buat Janji
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"}`}
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/> : <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white rounded-xl shadow-xl mb-4 p-4 border border-gray-100">
            <ul className="space-y-1">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#0b4f8a] font-medium transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#appointment" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 mt-2 bg-[#0b4f8a] text-white px-4 py-3 rounded-lg font-semibold justify-center">
                  📅 Buat Janji Temu
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
