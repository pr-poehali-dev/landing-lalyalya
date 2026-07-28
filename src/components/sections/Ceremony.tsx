import Icon from '@/components/ui/icon';
import ApplicationDialog from '@/components/ApplicationDialog';

const DETAILS = [
  { icon: 'Calendar', label: 'Дата и время', value: '31.08.2026 · 13:00' },
  { icon: 'MapPin', label: 'Место', value: 'Сцена на площади Адмирала Фокина, Владивосток' },
  {
    icon: 'Award',
    label: 'Повод',
    value: '20-летие Приморского краевого отделения «ОПОРЫ РОССИИ»',
  },
];

const Ceremony = () => {
  return (
    <section id="ceremony" className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-white">04</span>
          <span className="h-px flex-1 max-w-16 bg-white/25" />
          <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Событие
          </span>
        </div>

        <h2 className="mb-2 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
          Церемония открытия камня
        </h2>
        <p className="mb-8 text-xl font-semibold text-white/85">31 августа 2026 года · 13:00</p>

        <div className="mb-10 max-w-3xl space-y-4 text-lg leading-relaxed text-white/85">
          <p>
            В честь 20-летия Приморского краевого отделения «ОПОРЫ РОССИИ» состоится
            церемония открытия камня для будущего памятника предпринимателям Приморья
            и закладки капсулы времени.
          </p>
          <p>
            Это открытое городское событие для предпринимателей, партнёров проекта,
            представителей делового сообщества, жителей и гостей Владивостока.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {DETAILS.map((d) => (
            <div
              key={d.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={d.icon} size={22} />
              </span>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                {d.label}
              </p>
              <p className="mt-1.5 font-display text-lg font-bold leading-snug">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <ApplicationDialog>
            <button className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90">
              Принять участие
              <Icon name="ArrowRight" size={18} />
            </button>
          </ApplicationDialog>
          <a
            href="https://2gis.ru/vladivostok/geo/70030076837838956"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-primary"
          >
            <Icon name="Navigation" size={18} />
            Открыть место на карте
          </a>
        </div>
      </div>
    </section>
  );
};

export default Ceremony;