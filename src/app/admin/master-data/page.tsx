import { getMasterDataSnapshot } from "@/server/gateway/hisDummyData";

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

export default function MasterDataPage() {
  const snapshot = getMasterDataSnapshot();

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6 lg:p-8">
      <div className="hospital-grid-surface mb-6 rounded-[28px] p-6 text-white shadow-xl shadow-blue-950/15 lg:p-8">
        <p className="hospital-pill inline-flex px-4 py-2 text-xs font-bold uppercase tracking-widest">Backoffice service preview</p>
        <h1 className="mt-5 text-4xl font-black lg:text-5xl">Master <span className="text-emerald-400">data</span></h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-50">Unit layanan dan katalog tarif dummy untuk fondasi Phase 1.</p>
      </div>

      <section className="mb-6 grid gap-4 lg:grid-cols-5">
        {snapshot.units.map((unit) => (
          <div key={unit.code} className="hospital-card p-4">
            <p className="font-mono text-xs font-bold text-[#0b4f8a]">{unit.code}</p>
            <p className="mt-2 font-black text-slate-950">{unit.name}</p>
            <p className="mt-1 text-sm text-slate-500">{unit.lead}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600">{unit.services} layanan</span>
              <span className={unit.status === "Aktif" ? "font-bold text-emerald-600" : "font-bold text-amber-600"}>{unit.status}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {Object.entries(snapshot.catalogByUnit).map(([unit, items]) => (
          <div key={unit} className="hospital-card overflow-hidden">
            <div className="border-b border-slate-100 p-4">
              <h2 className="font-black text-slate-950">{unit}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.code} className="grid gap-2 p-4 sm:grid-cols-[110px_1fr_120px_90px] sm:items-center">
                  <span className="font-mono text-xs font-bold text-[#0b4f8a]">{item.code}</span>
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="text-sm text-slate-500">{item.tariff ? rupiah.format(item.tariff) : "Bundled"}</span>
                  <span className="text-xs font-bold text-slate-400">{item.turnaround}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
