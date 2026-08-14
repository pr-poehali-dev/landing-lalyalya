import Icon from '@/components/ui/icon';

const STATS = [
  { label: 'История предпринимательства в Приморье', value: 'Более 165 лет', icon: 'History' },
  { label: 'Приморскому отделению «ОПОРЫ РОССИИ»', value: '20 лет', icon: 'Award' },
  { label: 'Церемония открытия камня', value: '31.08.2026 · 13:00', icon: 'Calendar' },
  { label: 'Вскрытие капсулы времени', value: '2046 год', icon: 'Clock' },
];

const WhyImportant = () => {
  return (
    <section id="why" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">02</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Почему это важно
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
              Предприниматели создают будущее региона
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Предприниматели создают рабочие места, платят налоги, развивают
                инфраструктуру, запускают новые сервисы и формируют деловую культуру
                региона. При этом их вклад не всегда получает публичное признание.
              </p>
              <p>
                Памятник — это не привилегия. Это знак уважения и способ сказать: мы
                видим, ценим и помним тех, кто создаёт опору для будущего Приморья.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl border border-border p-6 shadow-sm ${
                  i % 2 === 0 ? 'bg-card-blue' : 'bg-card-red'
                }`}
              >
                <span
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                    i % 2 === 0
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  <Icon name={s.icon} size={22} />
                </span>
                <p className="text-2xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyImportant;