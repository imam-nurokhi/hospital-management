"use client";
import { useState, useEffect } from "react";

type Dept = { id: string; name: string; icon?: string };
type Doctor = { id: string; name: string; speciality: string };

export default function AppointmentForm() {
  const [depts, setDepts] = useState<Dept[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ appointmentNo: string; waDeeplink: string } | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientDob: "",
    departmentId: "",
    doctorId: "",
    visitDate: "",
    visitTime: "Pagi (08:00-12:00)",
    consultationType: "Rawat Jalan",
    complaint: "",
  });

  useEffect(() => {
    fetch("/api/departments")
      .then(r => r.json())
      .then(data => setDepts(Array.isArray(data) ? data : []))
      .catch(() => setDepts([]));
  }, []);

  useEffect(() => {
    if (form.departmentId) {
      fetch(`/api/doctors?departmentId=${form.departmentId}`)
        .then(r => r.json())
        .then(data => setDoctors(Array.isArray(data) ? data : []))
        .catch(() => setDoctors([]));
    } else {
      setDoctors([]);
    }
  }, [form.departmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat janji");
      setSuccess({ appointmentNo: data.appointmentNo, waDeeplink: data.waDeeplink });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Janji Temu Berhasil!</h3>
        <p className="text-gray-600 mb-4">Janji temu Anda telah berhasil dibuat.</p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">Nomor Pendaftaran</p>
          <p className="text-2xl font-bold text-[#0b4f8a]">{success.appointmentNo}</p>
        </div>
        <p className="text-sm text-gray-500 mb-6">Konfirmasi telah dikirim ke email & WhatsApp Anda (jika dikonfigurasi).</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={success.waDeeplink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            💬 Konfirmasi via WhatsApp
          </a>
          <button
            onClick={() => {
              setSuccess(null);
              setForm(f => ({ ...f, patientName: "", patientPhone: "", patientEmail: "", complaint: "" }));
            }}
            className="flex-1 border-2 border-[#0b4f8a] text-[#0b4f8a] hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Buat Janji Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#0b4f8a] to-[#1a7cc7] p-6 text-white">
        <h3 className="text-xl font-bold font-poppins">Form Pendaftaran Janji Temu</h3>
        <p className="text-blue-200 text-sm mt-1">Isi data dengan lengkap dan benar</p>
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Patient Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              No. WhatsApp / HP <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="patientPhone"
              value={form.patientPhone}
              onChange={handleChange}
              required
              placeholder="628xxxxxxxxxx"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              name="patientEmail"
              value={form.patientEmail}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tanggal Lahir</label>
            <input
              type="date"
              name="patientDob"
              value={form.patientDob}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Appointment Details */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Detail Kunjungan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Departemen / Poli <span className="text-red-500">*</span>
            </label>
            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all bg-white"
            >
              <option value="">-- Pilih Departemen --</option>
              {depts.map(d => (
                <option key={d.id} value={d.id}>{d.icon} {d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pilih Dokter</label>
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              disabled={!form.departmentId}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all bg-white disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">-- Semua Dokter --</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Tanggal Kunjungan <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="visitDate"
              value={form.visitDate}
              onChange={handleChange}
              required
              min={minDateStr}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Waktu Kunjungan</label>
            <select
              name="visitTime"
              value={form.visitTime}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all bg-white"
            >
              <option>Pagi (08:00-12:00)</option>
              <option>Siang (12:00-15:00)</option>
              <option>Sore (15:00-17:00)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jenis Konsultasi</label>
          <select
            name="consultationType"
            value={form.consultationType}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all bg-white"
          >
            <option>Rawat Jalan</option>
            <option>Konsultasi Online</option>
            <option>IGD</option>
            <option>Medical Check-Up</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Keluhan / Catatan</label>
          <textarea
            name="complaint"
            value={form.complaint}
            onChange={handleChange}
            rows={3}
            placeholder="Ceritakan keluhan atau catatan Anda..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0b4f8a] hover:bg-[#1a7cc7] disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Memproses...
            </>
          ) : (
            <>📅 Konfirmasi Janji Temu</>
          )}
        </button>

        <p className="text-xs text-center text-gray-400">
          Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku
        </p>
      </div>
    </form>
  );
}
