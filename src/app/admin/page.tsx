import Link from "next/link";
import { getFoundationDashboard } from "@/server/gateway/hisDummyData";

const statusClass = {
  Ready: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "In progress": "border-sky-200 bg-sky-50 text-sky-700",
  Blocked: "border-amber-200 bg-amber-50 text-amber-800",
};

export default function AdminDashboard() {
  const dashboard = getFoundationDashboard();
  const metrics = [
    { label: "User aktif", value: dashboard.metrics.activeUsers, note: "dummy identity-service", tone: "border-teal-500" },
    { label: "Role siap", value: dashboard.metrics.rolesConfigured, note: "permission guard baseline", tone: "border-indigo-500" },
    { label: "Master data", value: `${dashboard.metrics.masterDataCompletion}%`, note: "unit + catalog mapped", tone: "border-cyan-500" },
    { label: "Warning duplikat", value: dashboard.metrics.duplicateWarnings, note: "patient-service preview", tone: "border-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <section className="mb-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0b4f8a]">HIS Microservices MVP</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">Foundation command center</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            FE Phase 1 berjalan memakai dummy data berbentuk gateway response, supaya nanti tinggal dipindah ke BFF route saat service dan DB siap.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase text-slate-400">Next FE slice</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link className="rounded-md bg-[#0b4f8a] px-3 py-2 text-sm font-bold text-white hover:bg-[#1a7cc7]" href="/admin/identity">Identity</Link>
            <Link className="rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50" href="/admin/master-data">Master data</Link>
            <Link className="rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50" href="/admin/patients">Patient registry</Link>
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className={`rounded-lg border-l-4 ${metric.tone} border-y border-r border-slate-200 bg-white p-5 shadow-sm`}>
            <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{metric.value}</p>
            <p className="mt-1 text-xs text-slate-400">{metric.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-black text-slate-950">Phase 1 workstreams</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {dashboard.workstreams.map((item) => (
            <div key={item.name} className="grid gap-3 p-5 md:grid-cols-[1fr_160px_140px] md:items-center">
              <div>
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
              <p className="text-sm font-semibold text-slate-600">{item.owner}</p>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass[item.status]}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
