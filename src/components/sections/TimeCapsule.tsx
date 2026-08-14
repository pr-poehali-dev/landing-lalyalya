import Icon from '@/components/ui/icon';

const TimeCapsule = () => {
  return (
    <section id="capsule" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">05</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Капсула времени
          </span>
        </div>

        <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="mb-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
              Капсула времени
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Послание тем, кто будет строить предпринимательскую среду Приморья через
              20 лет.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-sm">
            <Icon name="Clock" size={16} />
            Открыть в 2046 году
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card-blue p-8 shadow-sm">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon name="Package" size={26} />
            </span>
            <h3 className="mb-3 font-display text-xl font-bold text-primary">
              Что будет внутри капсулы
            </h3>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                31 августа 2026 года, в день 20-летия Приморского отделения «ОПОРЫ
                РОССИИ», будет заложена капсула времени. В ней будет послание нынешних
                предпринимателей будущему поколению предпринимателей Приморского края.
              </p>
              <p>
                Это символ преемственности, веры в развитие региона и уважения к людям,
                которые продолжают создавать будущее. Послание будет извлечено из капсулы
                через 20 лет — в 2046 году.
              </p>
            </div>

            <blockquote className="mt-6 flex gap-3 rounded-xl border-l-4 border-accent bg-background/60 p-5">
              <Icon name="Quote" size={22} className="shrink-0 text-accent" />
              <p className="font-display text-base font-semibold leading-relaxed text-primary">
                «Мы пишем это послание не для истории — мы пишем его для вас».
              </p>
            </blockquote>
          </div>

          <div className="rounded-2xl border border-border bg-card-red p-8 shadow-sm">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Icon name="Gem" size={26} />
            </span>
            <h3 className="mb-3 font-display text-xl font-bold text-primary">
              Закладной камень рядом
            </h3>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Рядом с капсулой — мраморная глыба с табличкой из нержавеющей стали, где
                будет текст об установке в будущем памятника Почётным Предпринимателям
                Приморского края.
              </p>
              <p>
                Камень органично вписан в городскую среду площади Адмирала Фокина.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeCapsule;