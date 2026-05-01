import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { CalcResults } from "@/pages/Calculator";

interface Props {
  results: CalcResults;
}

interface Problem {
  title: string;
  desc: string;
  solution: string;
  type: "error" | "warning" | "success";
}

function getProblems(results: CalcResults): Problem[] {
  const problems: Problem[] = [];

  if (results.conversionToLead < 2) {
    problems.push({
      type: "error",
      title: "Проблема в прогреве",
      desc: `Ваша конверсия база → заявки: ${results.conversionToLead.toFixed(1)}% (норма: 3–5%). Аудитория не понимает ценность продукта или недостаточно прогрета.`,
      solution: "Что делать: карта смыслов + глубокая работа с болями ЦА + серия прогревающих сторис",
    });
  } else if (results.conversionToLead < 4) {
    problems.push({
      type: "warning",
      title: "Прогрев можно усилить",
      desc: `Конверсия ${results.conversionToLead.toFixed(1)}% — чуть ниже нормы (3–5%). Есть потенциал роста.`,
      solution: "Что делать: усилить триггеры соц. доказательства + конкретизировать оффер",
    });
  } else {
    problems.push({
      type: "success",
      title: "Прогрев работает хорошо",
      desc: `Конверсия ${results.conversionToLead.toFixed(1)}% — в норме или выше (3–5%). Аудитория реагирует на контент.`,
      solution: "Можно масштабировать этот этап",
    });
  }

  if (results.conversionToSale < 7) {
    problems.push({
      type: "error",
      title: "Проблема в продажах",
      desc: `Ваша конверсия заявки → оплаты: ${results.conversionToSale.toFixed(1)}% (норма: 8–15%). Люди интересуются, но не покупают.`,
      solution: "Что делать: отработка возражений + скрипты продаж + усиление доверия к эксперту",
    });
  } else if (results.conversionToSale < 12) {
    problems.push({
      type: "warning",
      title: "Продажи немного просаживаются",
      desc: `Конверсия ${results.conversionToSale.toFixed(1)}% — ниже оптимальной (12%+). Есть зоны для улучшения.`,
      solution: "Что делать: усилить дожимы + добавить бонусы за быстрое принятие решения",
    });
  } else {
    problems.push({
      type: "success",
      title: "Продажи конвертируют хорошо",
      desc: `Конверсия ${results.conversionToSale.toFixed(1)}% — в норме (8–15%). Воронка продаж работает.`,
      solution: "Фокус: масштабировать трафик",
    });
  }

  return problems;
}

export default function DiagnosticsSection({ results }: Props) {
  const problems = getProblems(results);

  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    success: CheckCircle2,
  };

  const colors = {
    error: {
      bg: "bg-red-50 border-red-200",
      icon: "text-red-500",
      title: "text-red-800",
      desc: "text-red-700",
      badge: "bg-red-100 text-red-700",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      icon: "text-amber-500",
      title: "text-amber-800",
      desc: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
    },
    success: {
      bg: "bg-emerald-50 border-emerald-200",
      icon: "text-emerald-500",
      title: "text-emerald-800",
      desc: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
    },
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Диагностика</p>
          <h2 className="text-4xl font-black text-foreground">ГДЕ ИМЕННО УТЕКАЮТ ДЕНЬГИ</h2>
        </div>

        <div className="space-y-5">
          {problems.map((p, i) => {
            const Icon = icons[p.type];
            const c = colors[p.type];
            return (
              <div key={i} className={`border rounded-2xl p-6 ${c.bg}`}>
                <div className="flex items-start gap-4">
                  <Icon className={`w-6 h-6 ${c.icon} mt-0.5 shrink-0`} />
                  <div className="flex-1 space-y-2">
                    <h3 className={`font-bold text-lg ${c.title}`}>{p.title}</h3>
                    <p className={`text-sm leading-relaxed ${c.desc}`}>{p.desc}</p>
                    <div className={`inline-block rounded-lg px-3 py-1.5 text-sm font-medium ${c.badge}`}>
                      {p.solution}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-muted rounded-2xl p-6 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong className="text-foreground">Важно:</strong> Большинство специалистов работают с поверхностными метриками (охваты, клики). Стратегический аудит анализирует полную воронку до финального ROI — так, как это делается в компаниях с оборотом 900+ млн ₽ в год.
          </p>
        </div>
      </div>
    </section>
  );
}
