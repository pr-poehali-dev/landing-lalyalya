import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const REASONS = [
  {
    icon: 'Landmark',
    title: 'Памятник станет реальностью',
    text: 'Каждый взнос идёт напрямую на создание памятного знака, закладного камня и капсулы времени. Без общего участия проект остаётся идеей — вместе мы превращаем его в объект, который увидят миллионы.',
  },
  {
    icon: 'Users',
    title: 'Признание для тысяч предпринимателей',
    text: 'Это знак уважения к людям, которые создают рабочие места, платят налоги, развивают Приморье и берут ответственность за будущее региона. Ваш вклад — часть этой большой благодарности.',
  },
  {
    icon: 'MapPin',
    title: 'Новая точка притяжения города',
    text: 'Памятник на площади Адмирала Фокина станет новым символом Владивостока — местом встреч, гордости и вдохновения для жителей и гостей города на десятилетия вперёд.',
  },
  {
    icon: 'Clock',
    title: 'Послание будущим поколениям',
    text: 'Капсула времени с посланиями сегодняшних предпринимателей будет вскрыта в 2046 году. Внося вклад, вы оставляете свой след в истории Приморья.',
  },
];

const Support = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="support" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">08</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Поддержать проект
          </span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl lg:text-5xl">
              Станьте частью истории Приморья
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Поддержать проект можно не только финансово. Для создания памятного знака
              и проведения церемонии нужны партнёры, экспертиза, услуги, материалы и идеи.
            </p>
          </div>

          <div className="relative flex flex-col rounded-2xl border border-border bg-card-red p-8 shadow-sm md:p-10">
            <button
              onClick={() => setOpen(true)}
              title="Зачем вносить средства?"
              aria-label="Зачем вносить средства"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition hover:scale-105 hover:opacity-90"
            >
              <Icon name="HelpCircle" size={22} />
            </button>

            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Icon name="HeartHandshake" size={26} />
            </span>
            <h3 className="mb-3 font-display text-2xl font-bold text-primary">
              Стать партнёром
            </h3>
            <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
              Внесите любую сумму на создание памятного знака и капсулы времени для
              будущих поколений.
            </p>
            <a
              href="mailto:pko@primopora.ru"
              className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
            >
              Внести сумму
              <Icon name="ArrowRight" size={18} />
            </a>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Ссылка на оплату добавляется после предоставления реквизитов или
              подключения платёжной страницы.
            </p>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto">
            <DialogHeader>
              <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon name="HeartHandshake" size={26} />
              </span>
              <DialogTitle className="font-display text-2xl font-bold text-primary">
                Зачем вносить вклад?
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                Памятник предпринимателям Приморья создаётся всем деловым сообществом.
                Любая сумма приближает открытие — и делает вас частью этой истории.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              {REASONS.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon name={r.icon} size={22} />
                  </span>
                  <div>
                    <p className="mb-1 font-display text-lg font-bold text-primary">
                      {r.title}
                    </p>
                    <p className="leading-relaxed text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-card-red p-5 text-center">
              <p className="mb-4 font-display text-lg font-bold text-primary">
                Даже небольшой вклад имеет значение
              </p>
              <a
                href="mailto:pko@primopora.ru"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
              >
                Внести сумму
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Support;
