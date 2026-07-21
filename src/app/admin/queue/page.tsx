import { getRegistrationQueueSnapshot } from "@/server/gateway/hisDummyData";

export default function QueuePage() {
  const snapshot = getRegistrationQueueSnapshot();

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6 lg:p-8">
      <div className="hospital-grid-surface mb-6 rounded-[28px] p-6 text-white shadow-xl shadow-blue-950/15 lg:p-8">
        <p className="hospital-pill inline-flex px-4 py-2 text-xs font-bold uppercase tracking-widest">Notification service preview</p>
        <h1 className="mt-5 text-4xl font-black lg:text-5xl">Queue <span className="text-emerald-400">dashboard</span></h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-50">Dummy display untuk antrean front office, MCU station, lab, dan kasir. Nantinya feed berasal dari SSE/WebSocket notification-service.</p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.queueDisplays.map((queue) => (
          <div key={queue.station} className="hospital-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-500">{queue.station}</p>
                <p className="mt-3 text-5xl font-black text-[#1a1a2e]">{queue.current}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${queue.color}`}>{queue.waiting} tunggu</span>
            </div>
            <div className="mt-6 rounded-2xl bg-[#f6f9fc] p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Berikutnya</p>
              <p className="mt-1 text-2xl font-black text-[#174a7e]">{queue.next}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="hospital-card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-bold text-slate-500">Total waiting</p>
            <p className="mt-2 text-4xl font-black text-emerald-500">{snapshot.queueCounters.waiting}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Currently serving</p>
            <p className="mt-2 text-4xl font-black text-[#174a7e]">{snapshot.queueCounters.serving}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Display mode</p>
            <p className="mt-2 text-2xl font-black text-[#1a1a2e]">Queue TV ready</p>
          </div>
        </div>
      </section>
    </div>
  );
}
