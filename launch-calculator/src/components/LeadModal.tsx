import { useState } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  calcData: {
    baseSize: number;
    leadsCount: number;
    salesCount: number;
    avgCheck: number;
    lostRevenue: number;
  };
}

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function trackEvent(eventType: string) {
  try {
    await fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType }),
    });
  } catch {}
}

export default function LeadModal({ open, onClose, calcData }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          baseSize: calcData.baseSize,
          leadsCount: calcData.leadsCount,
          salesCount: calcData.salesCount,
          avgCheck: calcData.avgCheck,
          lostRevenue: calcData.lostRevenue,
        }),
      });

      if (!res.ok) throw new Error("server error");

      await trackEvent("form_submitted");
      setStatus("success");

      setTimeout(() => {
        window.open("https://t.me/gottaknow", "_blank", "noopener,noreferrer");
        onClose();
      }, 1500);
    } catch {
      setStatus("error");
      setErrorMsg("Что-то пошло не так. Попробуйте ещё раз.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-foreground text-background w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-background transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Отлично! Открываю Telegram...</h3>
            <p className="text-muted-foreground text-sm">Ваши данные сохранены. Перенаправляем вас к Марго.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-primary font-semibold uppercase tracking-widest text-xs">Шаг 1 из 1</p>
              <h3 className="text-2xl font-black leading-tight">Куда отправить результаты?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Введите имя и телефон — Марго свяжется с вами для записи на аудит
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например: Иван"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-background placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 999 123-45-67"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-background placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !name.trim() || !phone.trim()}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold text-lg py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-100 shadow-lg shadow-primary/30"
            >
              {status === "loading" ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Сохраняем...</>
              ) : (
                <>ПЕРЕЙТИ В TELEGRAM <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
