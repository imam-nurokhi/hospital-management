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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b4f8a] to-[#1a7cc7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#0b4f8a] to-[#1a7cc7] p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                <path d="M10.5 3h3v4.5H18v3h-4.5V15h-3v-4.5H6v-3h4.5V3z"/>
              </svg>
            </div>
            <h1 className="text-white font-bold text-2xl">RS Sehat Medika</h1>
            <p className="text-blue-200 text-sm mt-1">Admin Dashboard</p>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Masuk ke Dashboard</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  placeholder="admin@rssehatmedika.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f8a] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input
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
                className="w-full bg-[#0b4f8a] hover:bg-[#1a7cc7] disabled:bg-gray-400 text-white py-3.5 rounded-xl font-bold transition-all"
              >
                {loading ? "Memproses..." : "Masuk →"}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 text-center">
              <p className="font-semibold text-gray-700 mb-1">Demo Credentials:</p>
              <p>Email: admin@rssehatmedika.com</p>
              <p>Password: admin123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
