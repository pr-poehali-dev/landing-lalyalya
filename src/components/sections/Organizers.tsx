import Icon from '@/components/ui/icon';

const PARTNERS = [
  {
    name: 'Приморское краевое отделение «ОПОРА РОССИИ»',
    logo: 'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/41adb462-a00e-46a2-90ef-29290e6ca77f.png',
  },
  {
    name: 'Школа «Хакни Нейросети»',
    logo: 'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/8b24499b-9af0-407e-8ae5-6245fda266be.png',
  },
];

const Organizers = () => {
  return (
    <section id="organizers" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">10</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Организаторы и партнёры
          </span>
        </div>

        <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Организаторы и партнёры
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Проект создаётся как совместная инициатива делового сообщества, партнёров
          и всех, кто разделяет ценность созидательного предпринимательства.
        </p>

        <div className="mb-12 flex flex-col gap-6 rounded-2xl border border-border bg-background p-8 shadow-sm md:flex-row md:items-center">
          <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-sm">
            <img
              src="/opora-logo.jpg"
              alt="Логотип «ОПОРЫ РОССИИ»"
              className="h-full w-full object-cover"
            />
          </span>
          <div>
            <h3 className="mb-2 font-display text-xl font-bold text-primary">
              Приморское краевое отделение «ОПОРА РОССИИ»
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              «ОПОРА РОССИИ» — общественная организация малого и среднего
              предпринимательства. Приморское краевое отделение объединяет
              предпринимателей региона, представляет их интересы и поддерживает
              развитие деловой среды.
            </p>
          </div>
        </div>

        <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-primary">
          Партнёры проекта:
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <div
              key={p.name}
              className={`flex min-h-32 items-center justify-center rounded-2xl border border-border p-5 shadow-sm ${
                i % 2 === 0 ? 'bg-card-blue' : 'bg-card-red'
              }`}
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-20 w-auto max-w-full object-contain"
              />
            </div>
          ))}

          <a
            href="mailto:pko@primopora.ru?subject=Заявка на партнёрство в проекте «Памятник Почётным Предпринимателям Приморья»&body=Здравствуйте! Хочу стать партнёром проекта.%0D%0A%0D%0AНазвание компании: %0D%0AКонтактное лицо: %0D%0AТелефон: %0D%0AЧем можем помочь проекту: "
            className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-5 text-center transition hover:border-accent hover:bg-card-red"
          >
            <Icon name="Plus" size={22} className="text-accent" />
            <p className="text-sm font-semibold text-muted-foreground">
              Ваш логотип — станьте партнёром
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Organizers;