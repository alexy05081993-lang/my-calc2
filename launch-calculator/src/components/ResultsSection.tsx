import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { CalcResults, CalcInputs } from "@/pages/Calculator";

interface Props {
  results: CalcResults;
  inputs: CalcInputs;
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("ru-RU");
}

function pct(n: number) {
  return n.toFixed(1) + "%";
}

type Status = "good" | "ok" | "bad";

function getLeadStatus(pct: number): Status {
  if (pct >= 4) return "good";
  if (pct >= 2) return "ok";
  return "bad";
}

function getSaleStatus(pct: number): Status {
  if (pct >= 12) return "good";
  if (pct >= 7) return "ok";
  return "bad";
}

function StatusBadge({ status, label }: { status: Status; label: string }) {
  const cfg = {
    good: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: TrendingUp, text: label },
    ok: { bg: "bg-amber-50 text-amber-700 border-amber-200", icon: Minus, text: label },
    bad: { bg: "bg-red-50 text-red-700 border-red-200", icon: TrendingDown, text: label },
  }[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${cfg.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.text}
    </span>
  );
}

export default function ResultsSection({ results, inputs }: Props) {
  const leadStatus = getLeadStatus(results.conversionToLead);
  const saleStatus = getSaleStatus(results.conversionToSale);

  const leadStatusLabel = leadStatus === "good" ? "Норма" : leadStatus === "ok" ? "Чуть ниже нормы" : "Ниже нормы";
  const saleStatusLabel = saleStatus === "good" ? "Норма" : saleStatus === "ok" ? "Чуть ниже нормы" : "Ниже нормы";

  return (
    <section id="results" className="py-16 px-4 bg-foreground text-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Ваши результаты</p>
          <h2 className="text-4xl font-black">МАТЕМАТИКА ВАШЕГО БИЗНЕСА</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Текущие показатели</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">База → Заявки</p>
                  <p className="text-2xl font-black">{pct(results.conversionToLead)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Норма рынка: 3–5%</p>
                </div>
                <StatusBadge status={leadStatus} label={leadStatusLabel} />
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Заявки → Оплаты</p>
                  <p className="text-2xl font-black">{pct(results.conversionToSale)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Норма рынка: 8–15%</p>
                </div>
                <StatusBadge status={saleStatus} label={saleStatusLabel} />
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-sm text-muted-foreground">Текущая выручка с запуска</p>
                <p className="text-3xl font-black">{fmt(results.currentRevenue)} ₽</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Потенциал при нормах рынка</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Потенциальные заявки</p>
                <p className="text-2xl font-black">{fmt(results.potentialLeads)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">База × 4% (норма рынка)</p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-sm text-muted-foreground">Потенциальные продажи</p>
                <p className="text-2xl font-black">{fmt(results.potentialSales)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Заявки × 12% (норма рынка)</p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-sm text-muted-foreground">Потенциальная выручка</p>
                <p className="text-3xl font-black text-emerald-400">{fmt(results.potentialRevenue)} ₽</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-3xl p-8 text-center space-y-4 shadow-2xl shadow-primary/30">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🚨</span>
          </div>
          <p className="text-lg font-medium text-primary-foreground/80 uppercase tracking-widest">Упущенная выгода</p>
          <p className="text-6xl sm:text-7xl font-black text-primary-foreground leading-none">
            {fmt(results.lostRevenue)} ₽
          </p>
          <p className="text-primary-foreground/70 text-sm">с каждого запуска</p>
          <div className="pt-2 border-t border-white/20">
            <p className="text-primary-foreground/60 text-sm">За год (4 запуска) это</p>
            <p className="text-3xl font-black text-primary-foreground/90">{fmt(results.yearlyLost)} ₽</p>
            <p className="text-primary-foreground/60 text-sm mt-1">недополученной прибыли</p>
          </div>
        </div>
      </div>
    </section>
  );
}
