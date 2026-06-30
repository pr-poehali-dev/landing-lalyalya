import SectionHeading from '@/components/sections/SectionHeading';
import { IMAGES } from '@/data/images';

type TagKind = 'walk' | 'bike' | 'kayak' | 'plain';

interface Stage {
  number: string;
  name: string;
  route: string;
  tags: { kind: TagKind; label: string }[];
  dist: string;
  days: string;
}

const STAGES: Stage[] = [
  {
    number: '1',
    name: 'Приморский',
    route: 'Владивосток → Хабаровск',
    tags: [
      { kind: 'bike', label: '🚴 Велосипед' },
      { kind: 'walk', label: '🥾 Пешком (нацпарки)' },
      { kind: 'plain', label: '⭐⭐' },
    ],
    dist: '800 км',
    days: '10–14 дней',
  },
  {
    number: '2',
    name: 'Тайга',
    route: 'Хабаровск → Якутск',
    tags: [
      { kind: 'bike', label: '🚴 Велосипед' },
      { kind: 'kayak', label: '🛶 Сплав' },
      { kind: 'plain', label: '⭐⭐⭐' },
    ],
    dist: '2 330 км',
    days: '30–45 дней',
  },
  {
    number: '3',
    name: 'Колыма',
    route: 'Якутск → Магадан · Трасса Р504',
    tags: [
      { kind: 'bike', label: '🚴 Велосипед (грунт)' },
      { kind: 'walk', label: '🥾 Пешком' },
      { kind: 'plain', label: '⭐⭐⭐⭐' },
    ],
    dist: '2 032 км',
    days: '25–35 дней',
  },
  {
    number: '4',
    name: 'Прорыв',
    route: 'Магадан → Палана (Корякия) · Самый дикий участок',
    tags: [
      { kind: 'walk', label: '🥾 Пешком (автономно)' },
      { kind: 'kayak', label: '🛶 Сплав' },
      { kind: 'plain', label: '⭐⭐⭐⭐⭐' },
    ],
    dist: '~1 200 км',
    days: '30–50 дней',
  },
  {
    number: '5',
    name: 'Камчатка',
    route: 'Палана → Петропавловск-Камчатский',
    tags: [
      { kind: 'walk', label: '🥾 Трейл' },
      { kind: 'kayak', label: '🛶 Морской каяк' },
      { kind: 'plain', label: '⭐⭐⭐⭐' },
    ],
    dist: '~900 км',
    days: '20–30 дней',
  },
  {
    number: '+',
    name: 'Вулканическое кольцо',
    route: 'Авачинская сопка · Горелый · Долина Гейзеров · Толбачик',
    tags: [
      { kind: 'walk', label: '🥾 Пешком' },
      { kind: 'plain', label: '🚁 Вертолёт' },
      { kind: 'plain', label: 'Опциональный' },
    ],
    dist: '~400 км',
    days: '10–15 дней',
  },
];

const tagClass: Record<TagKind, string> = {
  walk: 'bg-taiga/15 text-taiga',
  bike: 'bg-primary/15 text-primary',
  kayak: 'bg-terracotta/15 text-terracotta',
  plain: 'bg-surface-dynamic text-muted-foreground',
};

const Route = () => {
  return (
    <section
      id="route"
      className="bg-background px-4 md:px-8 py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal">
          <SectionHeading
            label="Этапы"
            title="6 этапов, 6 разных миров"
            body="Каждый этап — отдельное путешествие. Можно пройти один, несколько или весь маршрут целиком. ВДТ не требует ультраатлетических данных — он требует воли и времени."
          />
        </div>

        <img
          src={IMAGES.routeMap}
          alt="Карта маршрута ВДТ"
          loading="lazy"
          className="reveal w-full rounded-xl aspect-[16/7] object-cover shadow-2xl my-10 md:my-12"
        />

        <div className="flex flex-col gap-2">
          {STAGES.map((s) => (
            <article
              key={s.number}
              className="reveal grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-stretch border border-border rounded-lg overflow-hidden bg-surface hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center min-w-[56px] p-6 bg-surface-offset font-display text-2xl font-bold text-primary">
                {s.number}
              </div>
              <div className="px-6 py-5">
                <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1">
                  {s.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{s.route}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs tracking-wide ${tagClass[t.kind]}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex px-6 py-5 text-right flex-col justify-center gap-2 border-l border-border min-w-[120px]">
                <span className="font-display text-lg font-bold text-foreground">
                  {s.dist}
                </span>
                <span className="text-xs text-muted-foreground tracking-wide">
                  {s.days}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Route;
