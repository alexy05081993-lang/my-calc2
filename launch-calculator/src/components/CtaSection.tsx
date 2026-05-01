import { ArrowRight, Shield, Clock, Star } from "lucide-react";
import LeadModal from "./LeadModal";
import { useState } from "react";

interface Props {
  lostRevenue: number;
  calcData: {
    baseSize: number;
    leadsCount: number;
    salesCount: number;
    avgCheck: number;
    lostRevenue: number;
  };
  onCtaClick: () => void;
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("ru-RU");
}

export default function CtaSection({ lostRevenue, calcData, onCtaClick }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleCtaClick() {
    onCtaClick();
    setModalOpen(true);
  }

  return (
    <section className="py-20 px-4 bg-foreground text-background">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm">Следующий шаг</p>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight">
            КАК ВЕРНУТЬ<br /><span className="text-primary">{fmt(lostRevenue)} ₽</span><br />В КАССУ
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Калькулятор показал <strong className="text-background">сколько</strong> вы теряете. Стратегический аудит покажет <strong className="text-background">где именно</strong> — и даст конкретный план устранения.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-center">Стратегический аудит «Где утекают деньги»</h3>
          
          <div className="space-y-4">
            {[
              "Customer Journey Map — полная карта пути вашего клиента",
              "Все макро- и микроконверсии с расчётом в цифрах",
              "Сравнение с бенчмарками рынка — где ваши дыры",
              "Юнит-экономика: CAC, LTV, ROMI",
              "Конкретные ТЗ на исправление — не «советы», а план действий",
              "Стратегический созвон 90 минут с записью",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { icon: Shield, text: "Договор конфиденциальности" },
              { icon: Clock, text: "Результат через 2–3 дня" },
              { icon: Star, text: "10+ лет в реальных проектах" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="text-center space-y-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground leading-tight">{text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleCtaClick}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-100 shadow-lg shadow-primary/30"
          >
            ЗАПИСАТЬСЯ НА АУДИТ
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Пишите в Telegram: <span className="text-primary font-medium">@gottaknow</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              text: "«Стратегический аудит — это процесс, когда мы садимся вместе, собираем все ваши цифры по маркетингу и находим конкретное место, где система теряет деньги»",
              name: "Марго, growth-маркетолог",
            },
            {
              text: "«Нет смысла масштабировать хаос и заливать трафиком неработающую систему — это только увеличит ваши убытки. Сначала найдём дыру и залатаем её»",
              name: "Из методологии аудита",
            },
          ].map((q) => (
            <blockquote key={q.name} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed italic">{q.text}</p>
              <p className="text-xs text-primary font-medium">— {q.name}</p>
            </blockquote>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-muted-foreground text-sm">
            <strong className="text-background">МАРГО</strong> — growth-маркетолог · t.me/gottaknow
          </p>
        </div>
      </div>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        calcData={calcData}
      />
    </section>
  );
}
