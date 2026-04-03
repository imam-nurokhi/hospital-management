import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DoctorsAdminPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: { name: "asc" },
    include: {
      department: true,
      _count: { select: { appointments: true } },
    },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tim Dokter</h1>
        <p className="text-gray-500 text-sm mt-1">Daftar dokter yang terdaftar di sistem</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0b4f8a] to-[#1a7cc7] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                👨‍⚕️
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{doc.name}</h3>
                <p className="text-[#0b4f8a] text-xs font-medium mt-0.5">{doc.speciality}</p>
                <p className="text-gray-400 text-xs mt-1">{doc.department.name}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="font-bold text-gray-900">{doc.experience || "—"}</p>
                <p className="text-gray-400">Tahun</p>
              </div>
              <div>
                <p className="font-bold text-yellow-500">⭐ {doc.rating}</p>
                <p className="text-gray-400">Rating</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">{doc._count.appointments}</p>
                <p className="text-gray-400">Janji</p>
              </div>
            </div>
            <div className="mt-3">
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${doc.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${doc.isAvailable ? "bg-green-500" : "bg-red-500"}`}></span>
                {doc.isAvailable ? "Tersedia" : "Tidak Tersedia"}
              </span>
            </div>
          </div>
        ))}
        {doctors.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-400">Belum ada dokter terdaftar</div>
        )}
      </div>
    </div>
  );
}
