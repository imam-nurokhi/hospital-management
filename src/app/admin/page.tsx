import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalAppointments,
    todayAppointments,
    pendingCount,
    confirmedCount,
    completedCount,
    cancelledCount,
    totalPatients,
    totalMessages,
    unreadMessages,
    recentAppointments,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { visitDate: { gte: today, lt: tomorrow } } }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.appointment.count({ where: { status: "CONFIRMED" } }),
    prisma.appointment.count({ where: { status: "COMPLETED" } }),
    prisma.appointment.count({ where: { status: "CANCELLED" } }),
    prisma.patient.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { department: true, doctor: true },
    }),
  ]);

  const stats = [
    { label: "Total Janji Temu", value: totalAppointments, icon: "📅", color: "bg-blue-500", change: "+12% bulan ini" },
    { label: "Janji Hari Ini", value: todayAppointments, icon: "📆", color: "bg-purple-500", change: "Jadwal hari ini" },
    { label: "Menunggu Konfirmasi", value: pendingCount, icon: "⏳", color: "bg-amber-500", change: "Perlu tindakan" },
    { label: "Total Pasien", value: totalPatients, icon: "👥", color: "bg-emerald-500", change: "+5% bulan ini" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    const labels: Record<string, string> = {
      PENDING: "Menunggu",
      CONFIRMED: "Dikonfirmasi",
      COMPLETED: "Selesai",
      CANCELLED: "Dibatalkan",
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-800"}`}>{labels[status] || status}</span>;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang kembali! Berikut ringkasan hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-xl`}>{stat.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Menunggu", value: pendingCount, color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
          { label: "Dikonfirmasi", value: confirmedCount, color: "bg-blue-50 border-blue-200 text-blue-800" },
          { label: "Selesai", value: completedCount, color: "bg-green-50 border-green-200 text-green-800" },
          { label: "Dibatalkan", value: cancelledCount, color: "bg-red-50 border-red-200 text-red-800" },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 border ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Messages alert */}
      {unreadMessages > 0 && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">📩</span>
          <div>
            <p className="font-semibold text-amber-900">Ada {unreadMessages} pesan baru yang belum dibaca</p>
            <a href="/admin/messages" className="text-sm text-amber-700 hover:underline">Lihat semua pesan →</a>
          </div>
        </div>
      )}

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Janji Temu Terbaru</h2>
          <a href="/admin/appointments" className="text-sm text-[#0b4f8a] hover:underline font-medium">Lihat semua →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">No. Pendaftaran</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Pasien</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Departemen</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentAppointments.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Belum ada janji temu</td></tr>
              ) : recentAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#0b4f8a] font-semibold">{apt.appointmentNo}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{apt.patientName}</p>
                    <p className="text-xs text-gray-400">{apt.patientPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{apt.department?.name}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(apt.visitDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-4 py-3">{statusBadge(apt.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
