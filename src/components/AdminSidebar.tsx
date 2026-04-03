"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/appointments", label: "Janji Temu", icon: "📅" },
  { href: "/admin/patients", label: "Pasien", icon: "👥" },
  { href: "/admin/doctors", label: "Dokter", icon: "👨‍⚕️" },
  { href: "/admin/messages", label: "Pesan", icon: "✉️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className={`bg-[#0b4f8a] text-white flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"} min-h-screen flex-shrink-0`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/></svg>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">RS Sehat Medika</p>
              <p className="text-blue-200 text-xs">Admin Panel</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            {collapsed ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive(item)
                ? "bg-white text-[#0b4f8a] font-semibold shadow-md"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-white/10">
        <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all mb-1`} title={collapsed ? "Lihat Website" : undefined}>
          <span className="text-xl">🌐</span>
          {!collapsed && <span className="text-sm">Lihat Website</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-white transition-all"
          title={collapsed ? "Keluar" : undefined}
        >
          <span className="text-xl">🚪</span>
          {!collapsed && <span className="text-sm">Keluar</span>}
        </button>
      </div>
    </aside>
  );
}
