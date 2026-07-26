import Icon from '@/components/ui/icon';

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Память о созидателях должна иметь форму
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-white/85 md:text-xl">
          Памятник предпринимателям Приморья — это знак уважения к людям, которые
          создают опору для будущего региона.
        </p>

        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Icon name="Calendar" size={20} className="text-accent" />
            31 августа 2026 года · 13:00
          </div>
          <div className="flex items-center gap-2 text-lg font-medium text-white/85">
            <Icon name="MapPin" size={20} className="text-accent" />
            Сцена на площади Адмирала Фокина · Владивосток
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://ticketcode.ru/event/tseremoniya-otkrytiya-kamnya-dlya-pamyatnika-predprinimatelej-dalnego-vostoka-g--2?ref=svetlana-d-8e23"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
          >
            Принять участие
            <Icon name="ArrowRight" size={18} />
          </a>
          <a
            href="#support"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-primary"
          >
            Поддержать проект
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;