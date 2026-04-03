"use client";
import { useState, useEffect, useCallback } from "react";

type Appointment = {
  id: string;
  appointmentNo: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  department: { name: string };
  doctor?: { name: string } | null;
  visitDate: string;
  visitTime: string;
  consultationType: string;
  complaint?: string;
  status: string;
  emailSent: boolean;
  waSent: boolean;
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Menunggu",
  CONFIRMED: "Dikonfirmasi",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } finally { setUpdating(null); }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Hapus janji temu ini?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const filtered = appointments.filter(a => {
    const matchStatus = filter === "ALL" || a.status === filter;
    const matchSearch = !search || 
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.appointmentNo.toLowerCase().includes(search.toLowerCase()) ||
      a.patientPhone.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Janji Temu</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola semua janji temu pasien</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Cari nama, no. pendaftaran, atau HP..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a]"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] bg-white"
          >
            <option value="ALL">Semua Status</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button onClick={fetchAppointments} className="bg-[#0b4f8a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a7cc7] transition-colors">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">Menampilkan <strong>{filtered.length}</strong> dari {appointments.length} janji temu</p>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">Memuat data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">No.</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Pasien</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Departemen</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Jadwal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Notif</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Tidak ada data</td></tr>
                ) : filtered.map(apt => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#0b4f8a] font-bold">{apt.appointmentNo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{apt.patientName}</p>
                      <p className="text-xs text-gray-400">{apt.patientPhone}</p>
                      {apt.patientEmail && <p className="text-xs text-gray-400">{apt.patientEmail}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800">{apt.department?.name}</p>
                      {apt.doctor && <p className="text-xs text-gray-400">{apt.doctor.name}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{new Date(apt.visitDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p>
                      <p className="text-xs text-gray-400">{apt.visitTime}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <span title="Email" className={`text-xs px-1.5 py-0.5 rounded ${apt.emailSent ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>✉️</span>
                        <span title="WhatsApp" className={`text-xs px-1.5 py-0.5 rounded ${apt.waSent ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>💬</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={apt.status}
                        onChange={e => updateStatus(apt.id, e.target.value)}
                        disabled={updating === apt.id}
                        className={`text-xs font-semibold px-2 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-[#0b4f8a] cursor-pointer ${STATUS_COLORS[apt.status]}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteAppointment(apt.id)}
                        className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
