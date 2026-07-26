import Icon from '@/components/ui/icon';

const VALUES = [
  {
    icon: 'Hammer',
    title: 'Созидание',
    text: 'Способность создавать то, чего ещё не существует.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Ответственность',
    text: 'Готовность отвечать за решения, людей и последствия своих действий.',
  },
  {
    icon: 'Bird',
    title: 'Свобода',
    text: 'Внутренняя сила идти своим путём, искать возможности и принимать решения.',
  },
  {
    icon: 'TrendingUp',
    title: 'Движение вперёд',
    text: 'Постоянный поиск, развитие и готовность строить будущее.',
  },
];

const Values = () => {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">01</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
            Ценности
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`group rounded-2xl border border-border p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                i % 2 === 0 ? 'bg-card-blue' : 'bg-card-red'
              }`}
            >
              <span
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${
                  i % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                }`}
              >
                <Icon name={v.icon} size={26} />
              </span>
              <h3 className="mb-2 font-display text-xl font-bold text-primary">{v.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
