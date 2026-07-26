import Icon from '@/components/ui/icon';

const Quote = ({ children }: { children: string }) => (
  <blockquote className="my-6 flex gap-4 rounded-2xl border-l-4 border-accent bg-card-red p-6">
    <Icon name="Quote" size={28} className="shrink-0 text-accent" />
    <p className="font-display text-lg font-semibold leading-relaxed text-primary md:text-xl">
      {children}
    </p>
  </blockquote>
);

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-primary">{title}</h3>
    <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
  </div>
);

const Project = () => {
  return (
    <section id="project" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">02</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            О проекте
          </span>
        </div>

        <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Памятник предпринимателям Приморья
        </h2>

        <div className="mb-12 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            Этот памятник посвящён предпринимателям — тем, кто созидает, берёт
            ответственность, объединяет людей и формирует экономику региона не лозунгами,
            а ежедневным трудом.
          </p>
          <p>
            Проект создаётся как общественный символ уважения к предпринимательской
            инициативе и как точка связи между сегодняшним деловым сообществом и будущими
            поколениями предпринимателей Приморья.
          </p>
        </div>

        <Block title="Созидание и ответственность">
          <p>
            Предпринимательство — это не только про прибыль. Это про смыслы, инициативу
            и готовность создавать то, чего ещё не существует.
          </p>
          <p>
            Предприниматели открывают предприятия, создают рабочие места, развивают
            сервисы, строят команды и берут на себя ответственность за решения, которые
            влияют на жизнь города и края.
          </p>
        </Block>

        <Quote>«Мы не просто ведём бизнес — мы создаём регион».</Quote>

        <Block title="Приморье как территория предпринимателей">
          <p>
            Приморье — это территория, которая создавалась людьми действия. На протяжении
            многих поколений сюда приходили те, кто не ждал готовых условий, не искал
            простых решений и не боялся неопределённости.
          </p>
          <p>
            Они развивали порты, предприятия, торговлю, международные связи и городскую
            инфраструктуру. Владивосток стал точкой встречи России, стран Азии, Европы
            и Америки.
          </p>
        </Block>

        <Block title="Большая идея — признание роли">
          <p>
            Памятник предпринимателям — это не просто объект в городской среде. Это
            высказывание общества: здесь ценят тех, кто создаёт, рискует, строит
            и оставляет после себя результат.
          </p>
          <p>
            За 20 лет Приморское отделение «ОПОРЫ РОССИИ» стало площадкой для объединения
            предпринимателей, защиты их интересов и взаимодействия с органами власти.
          </p>
        </Block>

        <Quote>
          «Мы несём ответственность не только за свои компании, но и за среду, в которой
          будут жить следующие поколения».
        </Quote>
      </div>
    </section>
  );
};

export default Project;
