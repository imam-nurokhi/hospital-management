import { getRegistrationQueueSnapshot } from "@/server/gateway/hisDummyData";

const statusClass = {
  Draft: "bg-amber-50 text-amber-700",
  Verified: "bg-sky-50 text-sky-700",
  "Checked-in": "bg-emerald-50 text-emerald-700",
};

export default function RegistrationPage() {
  const snapshot = getRegistrationQueueSnapshot();

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6 lg:p-8">
      <div className="hospital-grid-surface mb-6 rounded-[28px] p-6 text-white shadow-xl shadow-blue-950/15 lg:p-8">
        <p className="hospital-pill inline-flex px-4 py-2 text-xs font-bold uppercase tracking-widest">Scheduling service preview</p>
        <h1 className="mt-5 text-4xl font-black lg:text-5xl">Registration <span className="text-emerald-400">desk</span></h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-50">Dummy front-office queue intake untuk Phase 2 sebelum registration API dan encounter service aktif.</p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Verified today", value: snapshot.queueCounters.verified, hint: "siap check-in" },
          { label: "Checked-in", value: snapshot.queueCounters.checkedIn, hint: "sudah masuk antrean" },
          { label: "Waiting queue", value: snapshot.queueCounters.waiting, hint: "lintas station" },
        ].map((metric) => (
          <div key={metric.label} className="hospital-card p-5">
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
            <p className="mt-3 text-4xl font-black text-[#1a1a2e]">{metric.value}</p>
            <p className="mt-1 text-xs text-slate-400">{metric.hint}</p>
          </div>
        ))}
      </section>

      <section className="hospital-card overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-black text-[#1a1a2e]">Registrasi hari ini</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">No.</th>
                <th className="px-4 py-3 text-left">Pasien</th>
                <th className="px-4 py-3 text-left">Channel</th>
                <th className="px-4 py-3 text-left">Tujuan</th>
                <th className="px-4 py-3 text-left">Jam</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {snapshot.registrations.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#174a7e]">{item.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{item.patientName}</p>
                    <p className="text-xs text-slate-400">{item.mrn}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.channel}</td>
                  <td className="px-4 py-3 text-slate-600">{item.destination}</td>
                  <td className="px-4 py-3 font-bold text-slate-700">{item.time}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[item.status]}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
