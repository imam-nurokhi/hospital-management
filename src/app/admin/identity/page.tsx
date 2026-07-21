import { getIdentitySnapshot } from "@/server/gateway/hisDummyData";

const statusClass = {
  Aktif: "bg-emerald-50 text-emerald-700",
  Undangan: "bg-sky-50 text-sky-700",
  Nonaktif: "bg-slate-100 text-slate-500",
};

export default function IdentityPage() {
  const { users, roles } = getIdentitySnapshot();

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0b4f8a]">Identity service preview</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Users, roles, permissions</h1>
        <p className="mt-2 text-sm text-slate-600">Dummy management screen untuk kontrak auth, role matrix, dan permission guard.</p>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.name} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-slate-950">{role.name}</p>
                <p className="text-sm text-slate-500">{role.users} user</p>
              </div>
              <span className="rounded-md bg-[#0b4f8a]/10 px-2 py-1 text-xs font-bold text-[#0b4f8a]">{role.permissions.length} izin</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {role.permissions.map((permission) => (
                <span key={permission} className="rounded-full border border-slate-200 px-2 py-1 font-mono text-[11px] text-slate-500">{permission}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 font-bold text-slate-950">Staff accounts</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#0b4f8a]">{user.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{user.role}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[user.status]}`}>{user.status}</span></td>
                  <td className="px-4 py-3 text-slate-500">{user.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
