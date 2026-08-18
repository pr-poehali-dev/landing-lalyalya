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
  photo?: string;
  title?: string;
}

const LINDGOLM_BIO = `Все во Владивостоке знают Токаревский маяк — визитную карточку столицы Приморья. Но мало кто знает, что построил его Отто Вильгельм (Васильевич) Линдгольм — самый богатый человек Дальнего Востока дореволюционной России, купец, путешественник, основатель китобойного промысла в регионе. Человек невероятной силы и мужества, шкипер, за 1869–1882 годы 13 раз обошедший земной шар.

Линдгольм родился в 1832 году на острове Утё в Финляндии, тогда входившей в состав Российской империи. Море манило его с детства: вместо университета он ушёл в море простым матросом, затем служил на судах Российско-Американской компании. С 1857 года — вольный шкипер; добычу китов освоил на службе в Российско-Финляндской китоловной компании.

В 1862–63 годах вместе с тремя товарищами-финнами он отправился на Дальний Восток, в Николаевск-на-Амуре, и основал китобойную факторию в Тугуре. Через три года компания владела тремя шхунами и сотнями баррелей китового жира. Товарищи не выдержали суровой жизни и ушли — остался только Линдгольм, о котором говорили, что у него «сатанинская сила». Один во всех ролях — от распорядителя до шкипера и гарпунёра — он лично добыл 26 китов. Однажды кит длиной 92 фута едва не утащил его на дно, но Линдгольм отшутился: «Бабка мне напророчила — не в воде моя смерть».

Пока шли дела в Тугуре, на Балтике его ждала невеста. Линдгольм всё оставил и вернулся за ней; она приехала с ним на Дальний Восток и даже выходила в море бить китов, но не выдержала суровых условий, простыла и умерла. Эту потерю он не смог простить себе до конца жизни.

Дело процветало: Линдгольм получил звание купца первой гильдии, а генерал-губернатор Восточной Сибири М. С. Корсаков добился для него награждения Золотым знаком на Владимирской ленте — как первого русского китобоя Дальнего Востока. Этот знак Линдгольм носил до самой смерти.

В 1874 году, обосновавшись во Владивостоке, он открыл торговый дом «О. В. Линдгольм и К°», получивший кредиты в Японии, США, Англии и Германии — к 1875 году на сумму до миллиона долларов. Он построил кирпичный завод, в 1896 году взял в аренду завод Кустера, разрабатывал угольные копи на 28-й версте от города. В жёсткой конкурентной борьбе он получил у Морского министерства подряд на строительство сухого дока имени цесаревича Николая на Дальзаводе — 7 октября 1897 года док торжественно открыли, и в него вошёл крейсер «Дмитрий Донской».

Строил Линдгольм и маяки по заказу Морского министерства — Аскольдовский, Поворотный, Речной — и неплохо на этом зарабатывал. Но Токаревский маяк на Токаревской кошке он возвёл на собственные деньги, без всякого подряда. Строительство начали в 1910 году, каменную башню высотой 8,23 метра сложили в 1911-м, а в 1913 году маяк наконец засветил. Линдгольм умер в декабре 1914 года — спустя год после того, как маяк, ставший символом Владивостока, начал свою работу.`;

const PEOPLE: Person[] = [
  {
    name: 'Яков Лазаревич Семёнов',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/d86eca80-6970-4f2a-8505-82e952cef004.png',
    bio: '',
  },
  {
    name: 'Юрий Михайлович Янковский',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/13de68d8-6c46-46c8-ac1a-b318760d3be6.png',
    bio: '',
  },
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
  {
    name: 'Отто Васильевич Линдгольм',
    title: 'Он построил Токаревский маяк',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/ee129d53-f24f-46ea-9839-763dd8c4f54f.png',
    bio: LINDGOLM_BIO,
  },
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
                  Почëтные Предприниматели Приморья
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
                <button
                  type="button"
                  key={person.name}
                  onClick={() => setActivePerson(person)}
                  aria-label={`История: ${person.name}`}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left shadow-sm transition hover:border-primary/40 hover:shadow-md"
                >
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="h-10 w-10 shrink-0 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <span className="h-10 w-10 shrink-0 rounded-full border border-border bg-muted" />
                  )}
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {person.name}
                  </span>
                  <Icon
                    name="MousePointerClick"
                    size={20}
                    className="shrink-0 animate-pulse text-[#D52B1E]"
                  />
                </button>
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
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <div className="mb-2 flex items-center gap-3">
              {activePerson?.photo ? (
                <img
                  src={activePerson.photo}
                  alt={activePerson.name}
                  className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
                />
              ) : (
                <span className="h-16 w-16 shrink-0 rounded-full border border-border bg-muted" />
              )}
              <div>
                <DialogTitle className="text-left">{activePerson?.name}</DialogTitle>
                {activePerson?.title && (
                  <p className="mt-0.5 text-sm font-semibold text-accent">
                    {activePerson.title}
                  </p>
                )}
              </div>
            </div>
            <DialogDescription asChild>
              <div className="space-y-3 text-left leading-relaxed">
                {activePerson?.bio
                  ? activePerson.bio
                      .split('\n\n')
                      .map((paragraph, i) => <p key={i}>{paragraph}</p>)
                  : <p>История этого предпринимателя скоро появится здесь.</p>}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GreatEntrepreneurs;