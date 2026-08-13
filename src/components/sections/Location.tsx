import Icon from '@/components/ui/icon';

const LOCATION_IMG =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/eafcd2bc-6509-4d37-9a72-d1a9f9d336b0.jpg';

const Location = () => {
  return (
    <section id="location" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">07</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Место в городе
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={LOCATION_IMG}
              alt="Площадь Адмирала Фокина, Владивосток"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="mb-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
              Площадь Адмирала Фокина
            </h2>

            <div className="mb-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Площадь Адмирала Фокина — центральная пешеходная зона Владивостока, место
                встреч горожан, туристов, предпринимателей и городских событий.
              </p>
              <p>
                Именно здесь состоится церемония открытия камня будущему памятнику
                Почетным Предпринимателям Приморья. Памятный знак станет частью городской среды
                и точкой притяжения для тех, кто ценит историю и будущее
                предпринимательства региона.
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-highlight">
                  <Icon name="MapPin" size={18} className="text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Адрес
                  </p>
                  <p className="font-display text-lg font-bold text-primary">
                    Сцена на площади Адмирала Фокина, Владивосток
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card-red">
                  <Icon name="Calendar" size={18} className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Дата и время
                  </p>
                  <p className="font-display text-lg font-bold text-primary">
                    31.08.2026 · 13:00
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://2gis.ru/vladivostok/geo/70030076837838956"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
            >
              <Icon name="Navigation" size={18} />
              Открыть геолокацию в 2ГИС
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;