import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/72ba56e3-9d30-400c-9fe4-dcd72b6d09cc.jpg';

const Hero = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-4 md:px-8 md:pb-20 md:pt-8 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-5 inline-block rounded-full bg-primary-highlight px-4 py-1.5 text-sm font-semibold text-primary">
            Приморское краевое отделение «ОПОРЫ РОССИИ»
          </p>

          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-5xl">
            Церемония открытия камня для памятника предпринимателям Приморья
          </h1>

          <div className="relative mt-6 lg:hidden">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={HERO_IMG}
                alt="Владивосток, Русский мост"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Icon name="Mic" size={20} className="text-accent" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Сцена · площадь Адмирала Фокина · Владивосток
                </span>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mt-6">
            Приглашаем предпринимателей, жителей и гостей Владивостока на церемонию
            открытия камня для будущего памятника предпринимателям Приморья.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="Calendar" size={22} className="shrink-0 text-accent" />
              <span className="text-lg font-bold text-foreground">
                31 августа 2026 года · 13:00
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={22} className="shrink-0 text-accent" />
              <span className="text-lg font-medium text-foreground">
                Сцена на площади Адмирала Фокина · Владивосток
              </span>
            </div>
          </div>

          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Это событие объединит тех, кто создаёт рабочие места, развивает город, берёт
            ответственность и формирует будущее Приморского края.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://ticketcode.ru/event/tseremoniya-otkrytiya-kamnya-dlya-pamyatnika-predprinimatelej-dalnego-vostoka-g--2?ref=svetlana-d-8e23"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
            >
              Принять участие
              <Icon name="ArrowRight" size={18} />
            </a>
            <a
              href="https://2gis.ru/vladivostok/geo/70030076837838956"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 text-base font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Icon name="Navigation" size={18} />
              Открыть геолокацию
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={HERO_IMG}
              alt="Владивосток, Русский мост"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-lg backdrop-blur md:left-8 md:right-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Icon name="Mic" size={20} className="text-accent" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Сцена · площадь Адмирала Фокина · Владивосток
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;