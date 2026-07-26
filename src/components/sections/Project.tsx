import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

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

const Quote = ({ children }: { children: string }) => (
  <blockquote className="my-6 flex gap-4 rounded-2xl border-l-4 border-accent bg-card-red p-6">
    <Icon name="Quote" size={28} className="shrink-0 text-accent" />
    <p className="font-display text-lg font-semibold leading-relaxed text-primary md:text-xl">
      {children}
    </p>
  </blockquote>
);

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-primary">{title}</h3>
    <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
  </div>
);

const Project = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="project" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">02</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            О проекте
          </span>
        </div>

        <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Памятник предпринимателям Приморья
        </h2>

        <div className="mb-12 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            Этот памятник посвящён предпринимателям — тем, кто созидает, берёт
            ответственность, объединяет людей и формирует экономику региона не лозунгами,
            а ежедневным трудом.
          </p>
          <p>
            Проект создаётся как общественный символ уважения к предпринимательской
            инициативе и как точка связи между сегодняшним деловым сообществом и будущими
            поколениями предпринимателей Приморья.
          </p>
        </div>

        <Block title="Созидание и ответственность">
          <p>
            Предпринимательство — это не только про прибыль. Это про смыслы, инициативу
            и готовность создавать то, чего ещё не существует.
          </p>
          <p>
            Предприниматели открывают предприятия, создают рабочие места, развивают
            сервисы, строят команды и берут на себя ответственность за решения, которые
            влияют на жизнь города и края.
          </p>
        </Block>

        <Quote>«Мы не просто ведём бизнес — мы создаём регион».</Quote>

        <Block title="Приморье как территория предпринимателей">
          <p>
            Приморье — это территория, которая создавалась людьми действия. На протяжении
            многих поколений сюда приходили те, кто не ждал готовых условий, не искал
            простых решений и не боялся неопределённости.
          </p>
          <p>
            Они развивали порты, предприятия, торговлю, международные связи и городскую
            инфраструктуру. Владивосток стал точкой встречи России, стран Азии, Европы
            и Америки.
          </p>
        </Block>

        <Block title="Большая идея — признание роли">
          <p>
            Памятник предпринимателям — это не просто объект в городской среде. Это
            высказывание общества: здесь ценят тех, кто создаёт, рискует, строит
            и оставляет после себя результат.
          </p>
          <p>
            За 20 лет Приморское отделение «ОПОРЫ РОССИИ» стало площадкой для объединения
            предпринимателей, защиты их интересов и взаимодействия с органами власти.
          </p>
        </Block>

        <Quote>
          «Мы несём ответственность не только за свои компании, но и за среду, в которой
          будут жить следующие поколения».
        </Quote>

        <Collapsible open={open} onOpenChange={setOpen} className="mt-10">
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-6 py-5 text-left transition hover:bg-surface-dynamic">
            <span className="font-display text-xl font-bold text-primary">
              Великие предприниматели Приморья
            </span>
            <Icon
              name={open ? 'ChevronUp' : 'ChevronDown'}
              size={22}
              className="shrink-0 text-primary"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-6">
            <div className="space-y-3 text-muted-foreground">
              <p>
                История края — это история людей, чьи решения, труд и предпринимательская
                энергия влияли на развитие территорий, городов, торговли, промышленности
                и культуры.
              </p>
              <p>
                В этом разделе будет формироваться открытый список предпринимателей,
                оставивших заметный след в истории Приморья: от первых купцов
                и промышленников до современных создателей компаний и инициатив.
              </p>
            </div>

            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Среди персон, которые могут быть представлены в разделе:
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {PEOPLE.map((p) => (
                <div
                  key={p.name}
                  className="flex gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon name={p.icon} size={24} className="text-primary" />
                  </span>
                  <div>
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-base font-bold text-primary">
                        {p.name}
                      </h4>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAG_STYLES[p.tagColor]}`}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="border-t border-border pt-6 text-center italic text-muted-foreground">
              Раздел будет дополняться историями людей, которые своим делом формировали
              и продолжают формировать Приморье.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default Project;