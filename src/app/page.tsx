import Navbar from "@/components/Navbar";
import AppointmentForm from "@/components/AppointmentForm";
import ClientInit from "@/components/ClientInit";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LoadingScreen />
      <ClientInit />
      <HeroSection />
      <QuickAccessSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <DoctorsSection />
      <AppointmentSection />
      <TestimonialsSection />
      <FacilitiesSection />
      <NewsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </>
  );
}

function LoadingScreen() {
  return (
    <div id="loading-screen">
      <div style={{ textAlign: "center" }}>
        <div className="loader-icon">
          <svg viewBox="0 0 24 24">
            <path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/>
          </svg>
        </div>
        <div className="loader-text">RS SEHAT MEDIKA</div>
        <div className="loader-bar"></div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  return (
    <button
      className="scroll-top-btn"
      id="scrollTopBtn"
      style={{ opacity: "0", visibility: "hidden", transition: "all 0.3s" }}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M12 4l8 8h-5v8H9v-8H4l8-8z"/>
      </svg>
    </button>
  );
}

function HeroSection() {
  return (
    <section className="hospital-grid-surface relative flex min-h-screen items-center overflow-hidden">
      <canvas id="particle-canvas" className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute left-[24%] top-[38%] h-72 w-72 rounded-full bg-white/8" />
      <div className="absolute -bottom-36 -left-20 h-[34rem] w-[34rem] rounded-full bg-white/8" />

      <div className="relative mx-auto w-full max-w-[1680px] px-5 pb-16 pt-36 sm:px-8 lg:px-12 lg:pt-44 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="max-w-3xl">
            <div className="hospital-pill mb-10 inline-flex items-center gap-3 px-6 py-3 text-base font-black tracking-wide">
              <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
              Layanan Kesehatan 24/7
            </div>
            <h1 className="font-poppins mb-8 text-6xl font-black leading-[1.08] text-white sm:text-7xl xl:text-[5.6rem]">
              Rumah Sakit<br />
              <span className="relative inline-block text-emerald-400 after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-emerald-500">Inovat</span><br />
              untuk Keluarga<br />
              Anda
            </h1>
            <p className="mb-12 max-w-2xl text-xl font-semibold leading-9 text-blue-50/85">
              Kami hadir dengan teknologi medis terkini, dokter spesialis berpengalaman, dan layanan kesehatan komprehensif untuk menjaga kesehatan Anda dan keluarga.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#appointment" className="hospital-cta inline-flex items-center gap-3 rounded-full px-9 py-5 text-lg font-black transition-all duration-300 hover:-translate-y-0.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M8 2v2H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2h-4V2H8zm-2 6h12v10H6V8zm5 2v3H8v2h3v3h2v-3h3v-2h-3v-3h-2z"/></svg>
                Buat Janji Sekarang
              </a>
              <a href="#services" className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-lg font-black text-[#174a7e] shadow-xl shadow-blue-950/20 transition-all duration-300 hover:-translate-y-0.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#174a7e] text-xs text-white">▶</span>
                Lihat Layanan
              </a>
            </div>

            <div className="mt-16 flex flex-wrap gap-12">
              {[
                { value: "15,000+", label: "Pasien Terlayani" },
                { value: "85+", label: "Dokter Spesialis" },
                { value: "20+", label: "Tahun Berpengalaman" },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-poppins text-4xl font-black text-emerald-400">{s.value}</div>
                  <div className="mt-2 text-base font-semibold text-blue-100/75">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block">
            <div className="absolute right-0 top-20 w-[640px] rounded-[28px] bg-white p-10 shadow-2xl shadow-blue-950/25">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1a7cc7]">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1a1a2e]">Dashboard Pasien</h3>
                    <p className="mt-2 text-lg font-semibold text-slate-500">Manajemen Kesehatan Digital</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-6 py-3 text-base font-black text-emerald-600">Online</span>
              </div>
              <div className="my-8 h-px bg-slate-200" />
              <div className="space-y-5">
                {[
                  { label: "Janji Temu", title: "Dr. Siti Rahayu – Jantung", status: "Hari Ini", tone: "bg-blue-50 text-[#174a7e]" },
                  { label: "Hasil Laboratorium", title: "Pemeriksaan Darah Lengkap", status: "Siap", tone: "bg-emerald-50 text-emerald-700" },
                  { label: "Konsultasi Online", title: "Dr. Ahmad Fauzi – Umum", status: "15 mnt", tone: "bg-orange-50 text-orange-600" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.tone}`}>
                        <span className="h-4 w-4 rounded-sm bg-current" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-500">{item.label}</p>
                        <p className="mt-1 text-lg font-black text-[#1a1a2e]">{item.title}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-4 py-2 text-sm font-black ${item.tone}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-0 top-8 rounded-3xl bg-white p-5 shadow-2xl shadow-blue-950/20">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <span className="h-4 w-4 rounded-full bg-current" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#1a1a2e]">98.6%</p>
                  <p className="text-base font-semibold text-slate-500">Tingkat Kepuasan</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 left-12 rounded-3xl bg-white p-5 shadow-2xl shadow-blue-950/20">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#174a7e]">
                  <span className="h-4 w-4 rounded-full bg-current" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#1a1a2e]">24/7</p>
                  <p className="text-base font-semibold text-slate-500">IGD Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickAccessSection() {
  const items = [
    { icon: "🚨", label: "IGD 24 Jam", desc: "Layanan darurat", href: "tel:02155667788", color: "bg-red-500" },
    { icon: "📅", label: "Buat Janji", desc: "Daftar online", href: "#appointment", color: "bg-[#0b4f8a]" },
    { icon: "👨‍⚕️", label: "Cari Dokter", desc: "Temukan spesialis", href: "#doctors", color: "bg-purple-600" },
    { icon: "🏥", label: "Layanan", desc: "Poli & fasilitas", href: "#services", color: "bg-teal-600" },
    { icon: "🏗️", label: "Fasilitas", desc: "Infrastruktur modern", href: "#facilities", color: "bg-amber-500" },
    { icon: "📞", label: "Kontak", desc: "Hubungi kami", href: "#contact", color: "bg-emerald-600" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {items.map(item => (
            <a key={item.label} href={item.href} className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                {item.icon}
              </div>
              <span className="font-semibold text-gray-800 text-sm text-center">{item.label}</span>
              <span className="text-xs text-gray-500 text-center hidden sm:block">{item.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0b4f8a] to-[#1a7cc7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "15,000+", label: "Pasien Tertangani", icon: "👥" },
            { value: "50+", label: "Dokter Spesialis", icon: "👨‍⚕️" },
            { value: "14", label: "Departemen Medis", icon: "🏥" },
            { value: "20+", label: "Tahun Pengalaman", icon: "🏆" },
          ].map(stat => (
            <div key={stat.label} className="text-center text-white">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-extrabold font-poppins mb-1">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Tentang Kami</span>
            <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Rumah Sakit Pilihan Keluarga Indonesia
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              RS Sehat Medika berdiri sejak tahun 2004 dan telah melayani lebih dari 15.000 pasien dengan dedikasi penuh. Kami berkomitmen memberikan pelayanan kesehatan berkualitas tinggi yang terjangkau bagi seluruh lapisan masyarakat.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Dengan lebih dari 50 dokter spesialis berpengalaman, teknologi medis terkini, dan fasilitas rawat inap yang nyaman, kami siap mendampingi perjalanan kesehatan Anda dan keluarga.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🏆", text: "Akreditasi KARS Paripurna" },
                { icon: "🔬", text: "Teknologi Medis Terkini" },
                { icon: "💊", text: "Farmasi 24 Jam" },
                { icon: "🌿", text: "Lingkungan Sehat & Nyaman" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            <a href="#appointment" className="inline-flex items-center gap-2 bg-[#0b4f8a] hover:bg-[#1a7cc7] text-white px-8 py-4 rounded-xl font-bold transition-all">
              Konsultasi Sekarang →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { bg: "bg-blue-600", title: "Misi Kami", desc: "Memberikan pelayanan kesehatan terbaik dengan standar internasional dan hati yang tulus." },
              { bg: "bg-emerald-600", title: "Visi Kami", desc: "Menjadi rumah sakit pilihan utama di Indonesia yang dikenal atas kualitas dan inovasi medis." },
              { bg: "bg-purple-600", title: "Nilai Kami", desc: "Integritas, Kompetensi, Empati, dan Inovasi dalam setiap aspek pelayanan kesehatan." },
              { bg: "bg-amber-500", title: "Komitmen", desc: "Kepuasan pasien adalah prioritas utama. Kami terus berinovasi untuk memberikan yang terbaik." },
            ].map(card => (
              <div key={card.title} className={`${card.bg} text-white p-6 rounded-2xl`}>
                <h4 className="font-bold text-lg mb-2">{card.title}</h4>
                <p className="text-sm opacity-90 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

async function ServicesSection() {
  const services = [
    { name: "Kardiologi (Jantung)", icon: "❤️", color: "#ef4444", description: "Diagnosis dan pengobatan penyakit jantung & pembuluh darah" },
    { name: "Neurologi (Saraf)", icon: "🧠", color: "#8b5cf6", description: "Gangguan sistem saraf pusat dan tepi" },
    { name: "Bedah Umum", icon: "🔪", color: "#f59e0b", description: "Prosedur operasi dan bedah tindakan" },
    { name: "Obstetri & Ginekologi", icon: "👶", color: "#10b981", description: "Kesehatan reproduksi wanita dan kebidanan" },
    { name: "Anak (Pediatri)", icon: "🧒", color: "#84cc16", description: "Pelayanan kesehatan anak dari bayi hingga remaja" },
    { name: "Penyakit Dalam", icon: "🫁", color: "#06b6d4", description: "Diagnosis penyakit organ tubuh bagian dalam" },
    { name: "Onkologi (Kanker)", icon: "🎗️", color: "#ec4899", description: "Deteksi dini dan pengobatan kanker" },
    { name: "Radiologi", icon: "🩻", color: "#3b82f6", description: "Pencitraan medis diagnosis menggunakan radiasi" },
    { name: "Ortopedi", icon: "🦴", color: "#d97706", description: "Gangguan tulang, sendi, otot, dan ligamen" },
    { name: "THT", icon: "👂", color: "#7c3aed", description: "Telinga, Hidung, Tenggorokan dan kepala leher" },
    { name: "Mata (Oftalmologi)", icon: "👁️", color: "#0891b2", description: "Kesehatan dan operasi mata" },
    { name: "Kulit & Kelamin", icon: "🌿", color: "#16a34a", description: "Penyakit kulit, estetika dermatologi" },
    { name: "Psikiatri", icon: "🧘", color: "#9333ea", description: "Kesehatan mental dan psikologis" },
    { name: "Dokter Umum / IGD", icon: "🚨", color: "#dc2626", description: "Pelayanan darurat 24 jam dan dokter umum" },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Layanan Medis</span>
          <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Departemen & Poli Spesialis</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Kami memiliki 14 departemen medis dengan dokter spesialis berpengalaman siap melayani Anda.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {services.map(svc => (
            <a key={svc.name} href="#appointment" className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: svc.color + "20" }}>
                {svc.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 group-hover:text-[#0b4f8a] transition-colors">{svc.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{svc.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorsSection() {
  const doctors = [
    { name: "dr. Budi Santoso, Sp.JP", speciality: "Kardiologi", experience: 15, rating: 4.9, emoji: "👨‍⚕️", available: true },
    { name: "dr. Siti Rahayu, Sp.N", speciality: "Neurologi", experience: 12, rating: 4.8, emoji: "👩‍⚕️", available: true },
    { name: "dr. Dewi Kusuma, Sp.OG", speciality: "Obstetri & Ginekologi", experience: 14, rating: 4.9, emoji: "👩‍⚕️", available: true },
    { name: "dr. Ahmad Fauzi, Sp.B", speciality: "Bedah Umum", experience: 10, rating: 4.7, emoji: "👨‍⚕️", available: true },
  ];

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Tim Medis</span>
          <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Dokter Spesialis Terbaik</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Didukung oleh lebih dari 50 dokter spesialis berpengalaman dengan dedikasi tinggi.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map(doc => (
            <div key={doc.name} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-br from-[#0b4f8a] to-[#1a7cc7] p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">
                  {doc.emoji}
                </div>
                {doc.available && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Tersedia
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{doc.name}</h3>
                <p className="text-[#0b4f8a] text-xs font-medium mb-3">{doc.speciality}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>⏱ {doc.experience} tahun</span>
                  <span className="text-yellow-500 font-semibold">⭐ {doc.rating}</span>
                </div>
                <a href="#appointment" className="block w-full text-center bg-blue-50 hover:bg-[#0b4f8a] text-[#0b4f8a] hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                  Buat Janji
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#appointment" className="inline-flex items-center gap-2 border-2 border-[#0b4f8a] text-[#0b4f8a] hover:bg-[#0b4f8a] hover:text-white px-8 py-3 rounded-xl font-bold transition-all">
            Lihat Semua Dokter →
          </a>
        </div>
      </div>
    </section>
  );
}

function AppointmentSection() {
  return (
    <section id="appointment" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Buat Janji</span>
            <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Pendaftaran Online<br />Mudah & Cepat
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Daftarkan janji temu Anda secara online. Setelah mendaftar, Anda akan menerima konfirmasi melalui email dan WhatsApp dengan nomor pendaftaran.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { step: "1", title: "Isi Formulir", desc: "Lengkapi data diri dan pilih departemen / dokter" },
                { step: "2", title: "Pilih Jadwal", desc: "Tentukan tanggal dan waktu kunjungan yang sesuai" },
                { step: "3", title: "Konfirmasi", desc: "Terima konfirmasi via email dan WhatsApp" },
                { step: "4", title: "Kunjungi RS", desc: "Datang tepat waktu dengan membawa dokumen yang diperlukan" },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-9 h-9 bg-[#0b4f8a] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#0b4f8a] to-[#1a7cc7] rounded-2xl p-6 text-white">
              <p className="font-bold mb-1">🚨 Keadaan Darurat?</p>
              <p className="text-blue-200 text-sm mb-3">IGD kami buka 24 jam setiap hari</p>
              <a href="tel:02155667788" className="inline-flex items-center gap-2 bg-white text-[#0b4f8a] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                📞 (021) 5566-7788
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <Suspense fallback={<div className="bg-white rounded-2xl p-8 text-center text-gray-500">Memuat form...</div>}>
              <AppointmentForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Budi Hartono", role: "Pasien Kardiologi", text: "Pelayanan yang sangat profesional. Dokter menjelaskan kondisi saya dengan sangat jelas. Fasilitas modern dan bersih. Sangat merekomendasikan!", rating: 5 },
    { name: "Sri Wahyuni", role: "Pasien Kebidanan", text: "Dokter Dewi sangat sabar dan perhatian. Proses persalinan saya berjalan lancar berkat tim medis yang berpengalaman dan ramah.", rating: 5 },
    { name: "Ahmad Ridwan", role: "Pasien Bedah", text: "Pasca operasi saya sangat cepat pulih berkat perawatan intensif dan tim dokter yang kompeten. Fasilitas kelas dunia!", rating: 5 },
    { name: "Nur Hidayah", role: "Pasien Anak", text: "Anak saya yang tadinya takut dokter, sekarang tidak takut lagi karena dr. Reza sangat ramah dan sabar dengan anak-anak.", rating: 5 },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0b4f8a] to-[#1a7cc7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Testimoni</span>
          <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-white mb-4">Apa Kata Pasien Kami</h2>
          <div className="flex items-center justify-center gap-1">
            {"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-2xl">{s}</span>)}
            <span className="text-white font-bold text-xl ml-2">4.9/5</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-4">
                {"★★★★★".split("").slice(0, t.rating).map((s, i) => <span key={i} className="text-yellow-400">{s}</span>)}
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">👤</div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-blue-200 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitiesSection() {
  const facilities = [
    { icon: "🔬", name: "Laboratorium Modern", desc: "Pemeriksaan laboratorium lengkap dengan teknologi terkini" },
    { icon: "🩻", name: "Radiologi & Imaging", desc: "MRI, CT-Scan, X-Ray, dan USG berteknologi tinggi" },
    { icon: "🫀", name: "ICU / ICCU", desc: "Unit perawatan intensif 24 jam dengan monitoring canggih" },
    { icon: "🍽️", name: "Kamar Perawatan", desc: "Ruang rawat inap nyaman dari kelas 3 hingga VIP suite" },
    { icon: "💊", name: "Apotek 24 Jam", desc: "Farmasi lengkap dengan tenaga apoteker profesional" },
    { icon: "🚑", name: "Ambulans", desc: "Layanan ambulans 24 jam dengan peralatan medis lengkap" },
    { icon: "🏃", name: "Rehabilitasi Medis", desc: "Fisioterapi dan rehabilitasi pasca operasi modern" },
    { icon: "🍱", name: "Gizi & Nutrisi", desc: "Konsultasi gizi dan pengelolaan nutrisi klinis" },
  ];

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Fasilitas</span>
          <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Fasilitas Medis Lengkap</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Dilengkapi dengan teknologi medis terkini untuk diagnosis dan pengobatan yang akurat.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map(fac => (
            <div key={fac.name} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-[#0b4f8a] group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:grayscale-0">{fac.icon}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0b4f8a] transition-colors">{fac.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function NewsSection() {
  let news: Array<{ id: string; title: string; excerpt: string; category: string; author: string; publishedAt: string }> = [];
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/news`, { next: { revalidate: 60 } });
    if (res.ok) news = await res.json();
  } catch { /* use empty */ }

  const fallbackNews = [
    { id: "1", title: "Tips Menjaga Kesehatan Jantung di Usia 40+", excerpt: "Penyakit jantung adalah penyebab kematian nomor satu. Berikut tips menjaga jantung tetap sehat.", category: "Kardiologi", author: "dr. Budi Santoso", publishedAt: new Date().toISOString() },
    { id: "2", title: "Kenali Tanda-Tanda Stroke dan Penanganannya", excerpt: "Stroke adalah kondisi darurat medis. Kenali metode FAST untuk respons cepat.", category: "Neurologi", author: "dr. Siti Rahayu", publishedAt: new Date().toISOString() },
    { id: "3", title: "Panduan Kehamilan Sehat Trimester Pertama", excerpt: "Trimester pertama adalah periode kritis bagi perkembangan janin.", category: "Obstetri", author: "dr. Dewi Kusuma", publishedAt: new Date().toISOString() },
  ];

  const displayNews = news.length > 0 ? news : fallbackNews;

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Informasi Kesehatan</span>
          <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Berita & Artikel Kesehatan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Informasi terkini seputar kesehatan dari tim dokter kami.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNews.slice(0, 3).map(article => (
            <article key={article.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="bg-gradient-to-br from-[#0b4f8a] to-[#1a7cc7] h-48 flex items-center justify-center">
                <span className="text-6xl opacity-60">📰</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-[#0b4f8a] px-3 py-1 rounded-full text-xs font-semibold mb-3">{article.category}</span>
                <h3 className="font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#0b4f8a] transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>✍️ {article.author}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block bg-blue-100 text-[#0b4f8a] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Hubungi Kami</span>
            <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">Ada Pertanyaan? Kami Siap Membantu</h2>
            
            <div className="space-y-6 mb-8">
              {[
                { icon: "📍", title: "Alamat", info: "Jl. Kesehatan No. 1, Jakarta Selatan 12130" },
                { icon: "📞", title: "Telepon", info: "(021) 5566-7788 | IGD: (021) 5566-7799" },
                { icon: "✉️", title: "Email", info: "info@rssehatmedika.com" },
                { icon: "🕐", title: "Jam Operasional", info: "Senin–Sabtu: 07:00–21:00 | IGD: 24 Jam" },
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a href="https://wa.me/6221556677" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25d366] hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
                💬 WhatsApp Kami
              </a>
              <a href="tel:02155667788"
                className="flex items-center gap-2 bg-[#0b4f8a] hover:bg-[#1a7cc7] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
                📞 Telepon Sekarang
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h3 className="font-bold text-xl text-gray-900 mb-6">Kirim Pesan</h3>
      <form id="contactForm" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama</label>
            <input type="text" name="name" required placeholder="Nama lengkap" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] bg-white" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input type="email" name="email" required placeholder="email@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] bg-white" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subjek</label>
          <input type="text" name="subject" placeholder="Perihal pesan" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] bg-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pesan</label>
          <textarea name="message" rows={5} required placeholder="Tulis pesan Anda..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] bg-white resize-none" />
        </div>
        <button type="submit" className="w-full bg-[#0b4f8a] hover:bg-[#1a7cc7] text-white py-4 rounded-xl font-bold transition-all">
          Kirim Pesan →
        </button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0b4f8a] rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/></svg>
              </div>
              <div>
                <div className="font-bold text-base font-poppins">RS Sehat Medika</div>
                <div className="text-gray-400 text-xs">Kesehatan Terbaik untuk Anda</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Rumah sakit terpercaya dengan standar pelayanan internasional sejak 2004.</p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Rawat Jalan", "Rawat Inap", "IGD 24 Jam", "Bedah & Operasi", "Medical Check-Up", "Farmasi"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Poli Spesialis</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Kardiologi", "Neurologi", "Bedah Umum", "Obstetri & Ginekologi", "Pediatri", "Penyakit Dalam"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>📍 Jl. Kesehatan No. 1, Jakarta Selatan</li>
              <li>📞 (021) 5566-7788</li>
              <li>✉️ info@rssehatmedika.com</li>
              <li>🕐 Senin–Sabtu: 07:00–21:00</li>
              <li>🚨 IGD: 24 Jam</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2024 RS Sehat Medika. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
            <a href="/admin" className="hover:text-white">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
