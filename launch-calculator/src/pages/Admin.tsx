import { useState, useEffect } from "react";
import { BarChart3, Users, MousePointerClick, Calculator, Send, Lock, RefreshCw } from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Stats {
  totalLeads: number;
  pageViews: number;
  calculatorUsed: number;
  ctaClicked: number;
  formSubmitted: number;
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  baseSize: string;
  leadsCount: string;
  salesCount: string;
  avgCheck: string;
  lostRevenue: string;
  createdAt: string;
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("ru-RU");
}

export default function Admin() {
  const [key, setKey] = useState("");
  const [enteredKey, setEnteredKey] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData(adminKey: string) {
    setLoading(true);
    setError("");
    try {
      const [sRes, lRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/stats?key=${encodeURIComponent(adminKey)}`),
        fetch(`${API_BASE}/api/admin/leads?key=${encodeURIComponent(adminKey)}`),
      ]);
      if (sRes.status === 401 || lRes.status === 401) {
        setError("Неверный ключ доступа");
        setEnteredKey("");
        setLoading(false);
        return;
      }
      const [s, l] = await Promise.all([sRes.json(), lRes.json()]);
      setStats(s);
      setLeads(l.leads ?? []);
      setEnteredKey(adminKey);
    } catch {
      setError("Ошибка соединения с сервером");
    }
    setLoading(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (key.trim()) fetchData(key.trim());
  }

  if (!enteredKey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-foreground text-background rounded-3xl p-8 space-y-6 border border-white/10 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-black">Панель администратора</h1>
            <p className="text-muted-foreground text-sm">Введите ключ доступа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Ключ доступа"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-background placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold py-3 rounded-xl transition-all"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const convRate = stats && stats.pageViews > 0
    ? ((stats.formSubmitted / stats.pageViews) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-foreground">Аналитика</h1>
            <p className="text-muted-foreground text-sm mt-1">Калькулятор потенциала запуска</p>
          </div>
          <button
            onClick={() => fetchData(enteredKey)}
            disabled={loading}
            className="flex items-center gap-2 bg-foreground text-background border border-foreground/20 hover:bg-foreground/90 disabled:opacity-50 font-medium px-4 py-2 rounded-xl transition-all text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Обновить
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Просмотры", value: fmt(stats.pageViews), icon: BarChart3, color: "text-blue-400" },
              { label: "Использовали калькулятор", value: fmt(stats.calculatorUsed), icon: Calculator, color: "text-yellow-400" },
              { label: "Нажали на CTA", value: fmt(stats.ctaClicked), icon: MousePointerClick, color: "text-orange-400" },
              { label: "Оставили заявку", value: fmt(stats.formSubmitted), icon: Send, color: "text-green-400" },
              { label: "Конверсия", value: `${convRate}%`, icon: Users, color: "text-primary" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-foreground/5 border border-foreground/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground leading-tight">{label}</p>
                  <Icon className={`w-4 h-4 ${color} shrink-0`} />
                </div>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-foreground/5 border border-foreground/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-foreground/10">
            <h2 className="font-bold text-foreground">Заявки ({leads.length})</h2>
          </div>
          {leads.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">Заявок пока нет</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Имя</th>
                    <th className="text-left px-4 py-3 font-medium">Телефон</th>
                    <th className="text-right px-4 py-3 font-medium">База</th>
                    <th className="text-right px-4 py-3 font-medium">Лиды</th>
                    <th className="text-right px-4 py-3 font-medium">Продажи</th>
                    <th className="text-right px-4 py-3 font-medium">Чек, ₽</th>
                    <th className="text-right px-4 py-3 font-medium">Теряет, ₽</th>
                    <th className="text-right px-4 py-3 font-medium">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                      <td className="px-4 py-3 text-foreground">{lead.phone}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{fmt(Number(lead.baseSize))}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{fmt(Number(lead.leadsCount))}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{fmt(Number(lead.salesCount))}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{fmt(Number(lead.avgCheck))}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary">{fmt(Number(lead.lostRevenue))}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground text-xs">
                        {new Date(lead.createdAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
