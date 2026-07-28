import Icon from '@/components/ui/icon';

const Support = () => {
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

          <div className="flex flex-col rounded-2xl border border-border bg-card-red p-8 shadow-sm md:p-10">
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
      </div>
    </section>
  );
};

export default Support;