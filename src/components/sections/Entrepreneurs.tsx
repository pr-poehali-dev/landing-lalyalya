import Icon from '@/components/ui/icon';

interface Person {
  name: string;
  tag: string;
  tagColor: 'blue' | 'red' | 'muted';
  text: string;
  icon: string;
}

const PEOPLE: Person[] = [
  {
    name: 'Семья Янковских',
    tag: 'Историческая персона',
    tagColor: 'blue',
    text: 'Часть исторического наследия Приморья; имя Янковских связано, в частности, с первым в регионе конным заводом.',
    icon: 'Landmark',
  },
  {
    name: 'Фёдоров',
    tag: 'Уточняется',
    tagColor: 'muted',
    text: 'Историческая персона для включения после уточнения полного имени и утверждённой справки заказчиком.',
    icon: 'HelpCircle',
  },
  {
    name: 'Дмитрий Алексеев',
    tag: 'Современный предприниматель',
    tagColor: 'red',
    text: 'Предприниматель Владивостока, сооснователь DNS; в 2026 году впервые вошёл в мировой рейтинг миллиардеров Forbes по версии российского СМИ.',
    icon: 'TrendingUp',
  },
  {
    name: 'Другие предприниматели Приморья',
    tag: 'Открыто для дополнения',
    tagColor: 'muted',
    text: 'По мере наполнения проекта и согласования с экспертным сообществом.',
    icon: 'Users',
  },
];

const TAG_STYLES: Record<Person['tagColor'], string> = {
  blue: 'bg-primary-highlight text-primary',
  red: 'bg-card-red text-accent',
  muted: 'bg-surface-dynamic text-muted-foreground',
};

const Entrepreneurs = () => {
  return (
    <section id="entrepreneurs" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Люди
          </span>
        </div>

        <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Великие предприниматели Приморья
        </h2>

        <div className="mb-10 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            История края — это история людей, чьи решения, труд и предпринимательская
            энергия влияли на развитие территорий, городов, торговли, промышленности
            и культуры.
          </p>
          <p>
            В этом разделе будет формироваться открытый список предпринимателей,
            оставивших заметный след в истории Приморья: от первых купцов и промышленников
            до современных создателей компаний и инициатив.
          </p>
        </div>

        <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">
          Среди персон, которые могут быть представлены в разделе:
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {PEOPLE.map((p) => (
            <div
              key={p.name}
              className="flex gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon name={p.icon} size={28} className="text-primary" />
              </span>
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-primary">{p.name}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAG_STYLES[p.tagColor]}`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-8 text-center font-display text-lg italic text-muted-foreground">
          Раздел будет дополняться историями людей, которые своим делом формировали
          и продолжают формировать Приморье.
        </p>
      </div>
    </section>
  );
};

export default Entrepreneurs;