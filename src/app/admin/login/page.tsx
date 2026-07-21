"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setForm({ email: "admin@rssehatmedika.com", password: "admin123456" });
    setError("");
  };

  return (
    <div className="hospital-grid-surface flex min-h-screen items-center justify-center p-4">
      <div className="grid w-[calc(100vw-32px)] max-w-[1080px] overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-blue-950/30 lg:grid-cols-[1fr_0.82fr]">
        <div className="hospital-grid-surface hidden min-w-0 p-10 text-white lg:block">
          <div className="mb-16 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                <path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black">RS Sehat Medika</h1>
              <p className="text-sm text-blue-100/80">Kesehatan Terbaik untuk Anda</p>
            </div>
          </div>
          <span className="hospital-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Layanan Kesehatan 24/7
          </span>
          <h2 className="mt-8 text-4xl font-black leading-tight xl:text-5xl">
            Dashboard HIS <span className="text-emerald-400">Modern</span> untuk Operasional RS
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-blue-50">
            Review modul admin dengan dummy data sampai microservice dan database siap disambungkan.
          </p>
        </div>

        <div className="min-w-0 p-6 sm:p-10">
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#174a7e]">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                <path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-[#1a1a2e]">RS Sehat Medika</h1>
            <p className="mt-1 text-sm text-slate-500">Admin Dashboard</p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-black text-[#1a1a2e]">Masuk ke Dashboard</h2>
            <p className="mb-6 text-sm text-slate-500">Gunakan credential demo untuk review UI tanpa DB.</p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  placeholder="admin@rssehatmedika.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="hospital-cta w-full rounded-full py-3.5 font-bold transition-all disabled:bg-gray-400"
              >
                {loading ? "Memproses..." : "Masuk →"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-[#f6f9fc] p-4 text-center text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-1">Demo Credentials:</p>
              <p>Email: admin@rssehatmedika.com</p>
              <p>Password: admin123456</p>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#174a7e] shadow-sm ring-1 ring-gray-200 hover:bg-blue-50"
              >
                Isi credential demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
