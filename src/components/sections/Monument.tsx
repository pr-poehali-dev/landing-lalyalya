import Icon from '@/components/ui/icon';

const MONUMENT_IMG =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/c1954dc5-1472-4181-8e8e-352398884295.png';

const Monument = () => {
  return (
    <section id="monument" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">05</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Памятный знак
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
              Памятный знак
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Это не декоративный объект, а символ предпринимательской инициативы,
              созидания и ответственности за будущее региона.
            </p>

            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src={MONUMENT_IMG}
                alt="Концепт памятного знака"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Иллюстративная визуализация концепции
            </p>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="mb-3 font-display text-xl font-bold text-primary">
                165 лет истории предпринимательства
              </h3>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  История Приморского края — это история людей действия. Предприниматели,
                  купцы и промышленники из разных стран развивали торговлю, производство,
                  порты и международные связи.
                </p>
                <p>
                  Памятник станет знаком признания: этот регион создавался людьми,
                  которые умели видеть возможности, принимать решения и строить будущее.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 font-display text-xl font-bold text-primary">
                Конкурс и реализация
              </h3>
              <div className="space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  Конкурс на эскиз и создание памятника проводится по согласованию
                  с инициаторами проекта, администрацией города и края. Реализация проекта
                  осуществляется при поддержке предпринимательского сообщества и партнёров.
                </p>
                <div className="flex items-start gap-4 rounded-2xl border border-accent/25 bg-card-red p-5">
                  <span className="flex h-11 w-11 shrink-0 animate-pulse items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon name="Mail" size={22} />
                  </span>
                  <div>
                    <p className="mb-1 font-semibold text-primary">
                      Ваши предложения по проекту, участию и реализации памятника
                      направляйте на почту:
                    </p>
                    <a
                      href="mailto:pko@primopora.ru"
                      className="font-display text-lg font-bold text-accent hover:underline"
                    >
                      pko@primopora.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="flex gap-4 rounded-2xl border-l-4 border-accent bg-card-red p-6">
              <Icon name="Quote" size={26} className="shrink-0 text-accent" />
              <p className="font-display text-lg font-semibold leading-relaxed text-primary">
                «Предприниматель — это человек, который создаёт среду, в которой могут
                жить и развиваться другие».
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Monument;