import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const PEOPLE: string[] = [
  'Яков Лазаревич Семёнов',
  'Михаил Иванович Янковский',
  'Михаил Иванович Суворов',
  'Михаил Григорьевич Шевелёв',
  'Юлий Иванович Бринер',
  'Константин Николаевич Шульгин',
  'Иван Яковлевич Чурин',
  'Василий Петрович Бабинцев',
  'Игнатий Иосифович Маковский',
  'Александр Александрович Иванов',
  'Александр Алексеевич Масленников',
  'Август Алексеевич Менард',
  'Иван Миронович Польский',
  'Алексей Дмитриевич Старцев',
  'Дмитрий Алексеевич Старцев',
  'Александр Алексеевич Старцев',
  'Карл Георгиевич Гильденштедт',
  'Мейер Моисеевич Люри',
  'Так Цзэмин',
  'Александр С. Лусаковский',
  'Братья Худяковы (Иустин, Павел, Александр)',
  'Иван Васильевич Кулаев',
  'Густав Васильевич Альберс',
  'Густав Николаевич Кунст',
  'Семья Куперов (Карл, Александр, Тамара)',
  'Василий Анисимович Жариков',
  'Скидельский (Хаим-Лейба Шиманович)',
  'Иоганн (Иван) Михайлович Лангелитье',
  'Отто Васильевич Линдгольм',
];

const GreatEntrepreneurs = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-background pb-6 pt-2 md:pb-10">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary-highlight px-6 py-5 text-left shadow-sm transition hover:border-primary/35 hover:shadow-md">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 flex-col overflow-hidden rounded-full border border-primary/10 transition group-hover:border-primary/20">
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#0039A6]" />
                <span className="flex-1 bg-[#D52B1E]" />
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
              className={`shrink-0 text-primary transition-transform group-hover:translate-y-0.5 ${open ? '' : 'animate-pulse'}`}
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
                Список предпринимателей, оставивших заметный след в истории Приморья:
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PEOPLE.map((name, i) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-highlight text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{name}</span>
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
