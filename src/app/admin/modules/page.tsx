import Link from "next/link";
import { getModuleShortcuts } from "@/server/gateway/hisDummyData";

type SearchParams = Promise<{ module?: string }>;

const statusClass = {
  Ready: "bg-emerald-50 text-emerald-700",
  Preview: "bg-sky-50 text-sky-700",
  Planned: "bg-slate-100 text-slate-600",
};

export default async function ModuleShortcutsPage({ searchParams }: { searchParams: SearchParams }) {
  const { module } = await searchParams;
  const shortcuts = getModuleShortcuts();
  const selected = shortcuts.find((shortcut) => shortcut.href.endsWith(`module=${module}`)) ?? shortcuts[0];
  const grouped = shortcuts.reduce<Record<string, typeof shortcuts>>((acc, shortcut) => {
    acc[shortcut.group] = [...(acc[shortcut.group] ?? []), shortcut];
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0b4f8a]">FE review shortcuts</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Module review board</h1>
        <p className="mt-2 text-sm text-slate-600">Semua modul dari plan bisa diklik dari sini. Modul yang belum dibuat tampil sebagai preview stub, jadi review alur FE tetap lancar.</p>
      </div>

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-500">Selected module</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{selected.label}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">{selected.description}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[selected.status]}`}>{selected.status}</span>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="rounded-lg border border-slate-200 bg-white shadow-sm">
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
