"use client";
import { useState, useEffect, useCallback } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg.id);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pesan Masuk</h1>
        <p className="text-gray-500 text-sm mt-1">Pesan dari form kontak website</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">Total: <strong>{messages.length}</strong> pesan | Belum dibaca: <strong className="text-amber-600">{messages.filter(m => !m.isRead).length}</strong></p>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-400">Memuat...</div>
          ) : (
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-gray-400">Belum ada pesan</div>
              ) : messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected?.id === msg.id ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!msg.isRead ? "bg-blue-500" : "bg-gray-200"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-sm font-semibold truncate ${!msg.isRead ? "text-gray-900" : "text-gray-600"}`}>{msg.name}</p>
                        <p className="text-xs text-gray-400 flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{msg.email}</p>
                      {msg.subject && <p className="text-xs font-medium text-gray-700 truncate">{msg.subject}</p>}
                      <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {selected ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selected.subject || "Tanpa Subjek"}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(selected.createdAt).toLocaleString("id-ID")}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                <a href={`mailto:${selected.email}`} className="text-sm text-[#0b4f8a] hover:underline">{selected.email}</a>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Pesan Anda"}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0b4f8a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a7cc7] transition-colors"
                >
                  ✉️ Balas via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] text-gray-400">
              <div className="text-center">
                <p className="text-4xl mb-3">✉️</p>
                <p className="text-sm">Pilih pesan untuk melihat detail</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
