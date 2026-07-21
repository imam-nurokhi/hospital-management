import Link from "next/link";
import { getModuleShortcuts, getPrototypeModuleLandscape } from "@/server/gateway/hisDummyData";

type SearchParams = Promise<{ module?: string }>;

const statusClass = {
  Ready: "bg-emerald-50 text-emerald-700",
  Preview: "bg-sky-50 text-sky-700",
  Planned: "bg-slate-100 text-slate-600",
};

const readinessClass = {
  Built: "bg-emerald-50 text-emerald-700",
  Enhanced: "bg-sky-50 text-sky-700",
  Queued: "bg-amber-50 text-amber-700",
};

export default async function ModuleShortcutsPage({ searchParams }: { searchParams: SearchParams }) {
  const { module } = await searchParams;
  const shortcuts = getModuleShortcuts();
  const prototypeModules = getPrototypeModuleLandscape();
  const selected = shortcuts.find((shortcut) => shortcut.href.endsWith(`module=${module}`)) ?? shortcuts[0];
  const grouped = shortcuts.reduce<Record<string, typeof shortcuts>>((acc, shortcut) => {
    acc[shortcut.group] = [...(acc[shortcut.group] ?? []), shortcut];
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6 lg:p-8">
      <div className="hospital-grid-surface mb-6 rounded-[28px] p-6 text-white shadow-xl shadow-blue-950/15 lg:p-8">
        <p className="hospital-pill inline-flex px-4 py-2 text-xs font-bold uppercase tracking-widest">FE review shortcuts</p>
        <h1 className="mt-5 text-4xl font-black text-white lg:text-5xl">Module <span className="text-emerald-400">review board</span></h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-50">Semua modul dari plan bisa diklik dari sini. Modul yang belum dibuat tampil sebagai preview stub, jadi review alur FE tetap lancar.</p>
      </div>

      <section className="hospital-card mb-6 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-500">Selected module</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{selected.label}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">{selected.description}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[selected.status]}`}>{selected.status}</span>
        </div>
      </section>

      <section className="hospital-card mb-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#174a7e]">Prototype audit</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Landscape modul dari prototype</h2>
          <p className="mt-1 text-sm text-slate-500">Semua halaman di `prototype/` sudah dipetakan sebagai backlog FE Next.js dengan status dummy saat ini.</p>
        </div>
        <div className="grid gap-px bg-slate-100 lg:grid-cols-2">
          {prototypeModules.map((item) => (
            <Link key={item.slug} href={item.route} className="bg-white p-5 hover:bg-blue-50/60">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f8f6] text-xl font-black text-[#0b8f87]">{item.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-black text-slate-950">{item.title}</h3>
                      <p className="mt-1 font-mono text-[11px] text-slate-400">{item.prototypeFile}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${readinessClass[item.readiness]}`}>{item.readiness}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {item.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl bg-[#f6f9fc] p-3">
                        <p className="text-lg font-black text-[#1a1a2e]">{metric.value}</p>
                        <p className="text-[11px] font-semibold text-slate-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span key={highlight} className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-500">{highlight}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="hospital-card overflow-hidden">
            <div className="border-b border-slate-100 p-4">
              <h2 className="font-black text-slate-950">{group}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <Link key={item.href} href={item.href} className="block p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">{item.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-bold ${statusClass[item.status]}`}>{item.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
