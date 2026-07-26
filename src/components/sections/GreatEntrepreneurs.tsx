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
  photo: string;
}

const PEOPLE: Person[] = [
  {
    name: 'Семья Янковских',
    tag: 'Историческая персона',
    tagColor: 'blue',
    text: 'Часть исторического наследия Приморья; имя Янковских связано, в частности, с первым в регионе конным заводом.',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/4aa0aaf0-df2f-42f8-a55f-775399d93da9.jpg',
  },
  {
    name: 'Фёдоров',
    tag: 'Уточняется',
    tagColor: 'muted',
    text: 'Историческая персона для включения после уточнения полного имени и утверждённой справки заказчиком.',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/9a188440-4649-43a9-9f32-86886106ba4b.jpg',
  },
  {
    name: 'Дмитрий Алексеев',
    tag: 'Современный предприниматель',
    tagColor: 'red',
    text: 'Предприниматель Владивостока, сооснователь DNS; в 2026 году впервые вошёл в мировой рейтинг миллиардеров Forbes по версии российского СМИ.',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/b2c5d73b-f2c7-46d4-99e1-12c060f88b98.jpg',
  },
  {
    name: 'Другие предприниматели Приморья',
    tag: 'Открыто для дополнения',
    tagColor: 'muted',
    text: 'По мере наполнения проекта и согласования с экспертным сообществом.',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/7e924508-b28f-4d90-a1b7-ff03d61c0b96.jpg',
  },
];

const TAG_STYLES: Record<Person['tagColor'], string> = {
  blue: 'bg-primary-highlight text-primary',
  red: 'bg-card-red text-accent',
  muted: 'bg-surface-dynamic text-muted-foreground',
};

const GreatEntrepreneurs = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-background pb-6 pt-2 md:pb-10">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary-highlight px-6 py-5 text-left shadow-sm transition hover:border-primary/35 hover:shadow-md">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary/15">
                <Icon name="Users" size={22} />
              </span>
              <div>
                <span className="block font-display text-xl font-bold text-primary">
                  Великие предприниматели Приморья
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={14} className="shrink-0" />
                  {open ? 'Свернуть' : 'Нажмите, чтобы узнать больше'}
                </span>
              </div>
            </div>
            <Icon
              name={open ? 'ChevronUp' : 'ChevronDown'}
              size={22}
              className="shrink-0 text-primary transition-transform group-hover:translate-y-0.5"
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
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary/15 bg-primary/10">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
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

export default GreatEntrepreneurs;