import { Users, MessageSquare, CreditCard, DollarSign } from "lucide-react";
import type { CalcInputs, CalcResults } from "@/pages/Calculator";

interface Props {
  inputs: CalcInputs;
  onChange: (inputs: CalcInputs) => void;
  results: CalcResults;
  onCalculate: () => void;
}

interface Field {
  key: keyof CalcInputs;
  label: string;
  hint: string;
  icon: typeof Users;
  placeholder: string;
  suffix?: string;
}

const fields: Field[] = [
  {
    key: "baseSize",
    label: "Размер активной базы",
    hint: "Подписчики в соцсетях + база в боте/email, которые видят ваш контент",
    icon: Users,
    placeholder: "Например: 5000",
    suffix: "человек",
  },
  {
    key: "leads",
    label: "Заявки на последнем запуске",
    hint: "Записались на вебинар, заполнили анкету, написали в директ",
    icon: MessageSquare,
    placeholder: "Например: 80",
    suffix: "заявок",
  },
  {
    key: "sales",
    label: "Оплаты с последнего запуска",
    hint: "Количество учеников/клиентов, которые реально заплатили",
    icon: CreditCard,
    placeholder: "Например: 6",
    suffix: "продаж",
  },
  {
    key: "avgCheck",
    label: "Ваш средний чек",
    hint: "Средняя стоимость покупки одного ученика",
    icon: DollarSign,
    placeholder: "Например: 30000",
    suffix: "₽",
  },
];

function formatNumber(val: number) {
  if (!val) return "—";
  return val.toLocaleString("ru-RU");
}

export default function InputSection({ inputs, onChange, results, onCalculate }: Props) {
  const allFilled = fields.every((f) => inputs[f.key].length > 0);

  return (
    <section id="calculator" className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Шаг 1</p>
        <h2 className="text-4xl font-black text-foreground">ВВЕДИТЕ ВАШИ ЦИФРЫ</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Математика не врёт. Введите реальные числа — получите точную картину.
        </p>
      </div>

      <div className="space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          const val = inputs[field.key];
          const numVal = parseFloat(val) || 0;
          return (
            <div key={field.key} className="group bg-card border border-border rounded-2xl p-6 transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block font-bold text-foreground mb-1 text-base">{field.label}</label>
                  <p className="text-sm text-muted-foreground mb-3 leading-snug">{field.hint}</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      value={val}
                      onChange={(e) => onChange({ ...inputs, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="no-spinner flex-1 bg-background border border-border rounded-xl px-4 py-3 text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                    {field.suffix && (
                      <span className="text-muted-foreground font-medium whitespace-nowrap shrink-0">{field.suffix}</span>
                    )}
                  </div>
                  {numVal > 0 && field.key === "avgCheck" && (
                    <p className="mt-2 text-xs text-muted-foreground">{formatNumber(numVal)} ₽ за ученика</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allFilled && (
        <div className="mt-8 text-center">
          <button
            onClick={onCalculate}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-100 shadow-lg shadow-primary/20"
          >
            СМОТРЕТЬ РЕЗУЛЬТАТ
          </button>
          <p className="mt-3 text-sm text-muted-foreground">Расчёт уже идёт в реальном времени ↓</p>
        </div>
      )}
    </section>
  );
}
