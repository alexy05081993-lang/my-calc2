import { ChevronDown, BarChart3, TrendingUp, Target } from "lucide-react";

interface Props {
  onCta: () => void;
}

export default function HeroSection({ onCta }: Props) {
  return (
    <section className="relative overflow-hidden bg-foreground text-background min-h-[92vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-12 left-10 text-9xl font-black text-background">%</div>
        <div className="absolute bottom-20 right-8 text-8xl font-black text-background">₽</div>
        <div className="absolute top-1/2 left-1/3 text-7xl font-black text-background">→</div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
          Лид-магнит 2026
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-medium">Калькулятор</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight">
            ПОТЕНЦИАЛА<br />
            <span className="text-primary">ЗАПУСКА</span>
          </h1>
        </div>

        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Узнайте за <strong className="text-background">3 минуты</strong>, сколько денег вы оставляете на столе из-за «дырявой» воронки
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          {[
            { icon: BarChart3, text: "Расчёт упущенной выгоды на основе вашей базы" },
            { icon: TrendingUp, text: "Сравнение с нормами рынка 2026 года" },
            { icon: Target, text: "Конкретный план: где докрутить конверсии" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-snug">{text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-100 shadow-lg shadow-primary/30"
          >
            РАССЧИТАТЬ МОЙ ПОТЕНЦИАЛ
            <ChevronDown className="w-5 h-5" />
          </button>
          <p className="text-sm text-muted-foreground">
            Без регистрации. Результат сразу.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-background">МАРГО</span> — growth-маркетолог
            <span className="mx-2 text-white/20">·</span>
            10+ лет опыта
            <span className="mx-2 text-white/20">·</span>
            Запуски от 1 до 3,7 млн ₽
          </p>
        </div>
      </div>
    </section>
  );
}
