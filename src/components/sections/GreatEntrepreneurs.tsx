import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Person {
  name: string;
  bio: string;
}

const PEOPLE: Person[] = [
  { name: 'Яков Лазаревич Семёнов', bio: '' },
  { name: 'Михаил Иванович Янковский', bio: '' },
  { name: 'Михаил Иванович Суворов', bio: '' },
  { name: 'Михаил Григорьевич Шевелёв', bio: '' },
  { name: 'Юлий Иванович Бринер', bio: '' },
  { name: 'Константин Николаевич Шульгин', bio: '' },
  { name: 'Иван Яковлевич Чурин', bio: '' },
  { name: 'Василий Петрович Бабинцев', bio: '' },
  { name: 'Игнатий Иосифович Маковский', bio: '' },
  { name: 'Александр Александрович Иванов', bio: '' },
  { name: 'Александр Алексеевич Масленников', bio: '' },
  { name: 'Август Алексеевич Менард', bio: '' },
  { name: 'Иван Миронович Польский', bio: '' },
  { name: 'Алексей Дмитриевич Старцев', bio: '' },
  { name: 'Дмитрий Алексеевич Старцев', bio: '' },
  { name: 'Александр Алексеевич Старцев', bio: '' },
  { name: 'Карл Георгиевич Гильденштедт', bio: '' },
  { name: 'Мейер Моисеевич Люри', bio: '' },
  { name: 'Так Цзэмин', bio: '' },
  { name: 'Александр С. Лусаковский', bio: '' },
  { name: 'Братья Худяковы (Иустин, Павел, Александр)', bio: '' },
  { name: 'Иван Васильевич Кулаев', bio: '' },
  { name: 'Густав Васильевич Альберс', bio: '' },
  { name: 'Густав Николаевич Кунст', bio: '' },
  { name: 'Семья Куперов (Карл, Александр, Тамара)', bio: '' },
  { name: 'Василий Анисимович Жариков', bio: '' },
  { name: 'Скидельский (Хаим-Лейба Шиманович)', bio: '' },
  { name: 'Иоганн (Иван) Михайлович Лангелитье', bio: '' },
  { name: 'Отто Васильевич Линдгольм', bio: '' },
];

const GreatEntrepreneurs = () => {
  const [open, setOpen] = useState(false);
  const [activePerson, setActivePerson] = useState<Person | null>(null);

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
              {PEOPLE.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm"
                >
                  <span className="h-10 w-10 shrink-0 rounded-full border border-border bg-muted" />
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {person.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePerson(person)}
                    aria-label={`История: ${person.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-highlight text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon name="HelpCircle" size={16} />
                  </button>
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

      <Dialog open={!!activePerson} onOpenChange={(v) => !v && setActivePerson(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-12 w-12 shrink-0 rounded-full border border-border bg-muted" />
              <DialogTitle className="text-left">{activePerson?.name}</DialogTitle>
            </div>
            <DialogDescription className="text-left">
              {activePerson?.bio || 'История этого предпринимателя скоро появится здесь.'}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GreatEntrepreneurs;