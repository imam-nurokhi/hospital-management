import { getPatientRegistry } from "@/server/gateway/hisDummyData";

const riskClass = {
  Normal: "bg-emerald-50 text-emerald-700",
  Duplikat: "bg-rose-50 text-rose-700",
  "Butuh verifikasi": "bg-amber-50 text-amber-700",
};

export default function PatientsPage() {
  const registry = getPatientRegistry();

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0b4f8a]">Patient service preview</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Patient registry</h1>
        <p className="mt-2 text-sm text-slate-600">Dummy list untuk validasi alur duplicate checker sebelum DB patient-service siap.</p>
      </div>

      {registry.duplicateWarnings.length > 0 && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
          <p className="font-bold text-rose-900">{registry.duplicateWarnings.length} potensi pasien duplikat perlu diverifikasi</p>
          <p className="mt-1 text-sm text-rose-700">
            {registry.duplicateWarnings.map((warning) => `${warning.patientName}: ${warning.reason}`).join(" | ")}
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 text-sm text-slate-500">
          Total: <strong className="text-slate-950">{registry.patients.length}</strong> pasien dummy
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">MRN</th>
                <th className="px-4 py-3 text-left">Pasien</th>
                <th className="px-4 py-3 text-left">Kontak</th>
                <th className="px-4 py-3 text-left">Kunjungan</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registry.patients.map((patient) => (
                <tr key={patient.mrn} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#0b4f8a]">{patient.mrn}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{patient.name}</p>
                    <p className="text-xs text-slate-400">{patient.birthDate}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{patient.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{patient.lastVisit}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${riskClass[patient.risk]}`}>{patient.risk}</span>
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
