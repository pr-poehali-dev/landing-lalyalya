import Icon from '@/components/ui/icon';
import ApplicationDialog from '@/components/ApplicationDialog';

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Память о созидателях
          <br />
          должна иметь{' '}
          <span className="relative whitespace-nowrap text-accent">
            форму
            <svg
              className="absolute -bottom-1 left-0 w-full text-accent/60"
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 9c20-6 96-6 116 0"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-white/85 md:text-xl">
          Памятник Почётным Предпринимателям Приморья — это знак уважения к людям, которые
          создают опору для будущего региона.
        </p>

        <div className="mb-10 flex flex-col items-stretch gap-3 rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:divide-x sm:divide-white/15">
          <div className="flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-left sm:justify-start">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Icon name="Calendar" size={20} className="shrink-0 text-accent" />
            </span>
            <span className="text-lg font-semibold">
              31 августа 2026 · сбор в 12:30, начало в 13:00
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-left sm:justify-start">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Icon name="MapPin" size={20} className="shrink-0 text-accent" />
            </span>
            <span className="text-lg font-medium text-white/90">
              Сцена на площади Адмирала Фокина · Владивосток
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ApplicationDialog>
            <button className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90">
              Принять участие
              <Icon name="ArrowRight" size={18} />
            </button>
          </ApplicationDialog>
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