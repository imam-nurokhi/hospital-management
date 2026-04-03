import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { appointments: true } },
    },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Pasien</h1>
        <p className="text-gray-500 text-sm mt-1">Daftar semua pasien terdaftar</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Total: <strong>{patients.length}</strong> pasien</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">No. Medis</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nama</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kontak</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Janji Temu</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Terdaftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Belum ada pasien</td></tr>
              ) : patients.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#0b4f8a] font-bold">{p.medicalNo || "—"}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    {p.bloodType && <p className="text-xs text-gray-400">Gol. Darah: {p.bloodType}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700">{p.phone}</p>
                    {p.email && <p className="text-xs text-gray-400">{p.email}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-50 text-[#0b4f8a] px-2.5 py-1 rounded-full text-xs font-semibold">
                      {p._count.appointments} janji
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(p.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
