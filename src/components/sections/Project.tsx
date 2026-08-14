import * as AccordionPrimitive from '@radix-ui/react-accordion';
import Icon from '@/components/ui/icon';

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;

const Quote = ({ children }: { children: string }) => (
  <blockquote className="my-6 flex gap-4 rounded-2xl border-l-4 border-accent bg-card-red p-6">
    <Icon name="Quote" size={28} className="shrink-0 text-accent" />
    <p className="font-display text-lg font-semibold leading-relaxed text-primary md:text-xl">
      {children}
    </p>
  </blockquote>
);

interface SectionProps {
  value: string;
  icon: string;
  title: string;
  color: 'primary' | 'accent';
  children: React.ReactNode;
}

const ProjectSection = ({ value, icon, title, color, children }: SectionProps) => (
  <AccordionItem
    value={value}
    className="overflow-hidden rounded-2xl border border-border bg-surface"
  >
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-surface-dynamic">
        <div className="flex items-center gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
              color === 'accent'
                ? 'bg-accent/10 text-accent group-hover:bg-accent/15'
                : 'bg-primary/10 text-primary group-hover:bg-primary/15'
            }`}
          >
            <Icon name={icon} size={22} />
          </span>
          <div>
            <span className="block font-display text-xl font-bold tracking-tight text-primary">
              {title}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Icon
                name="ChevronDown"
                size={14}
                className="shrink-0 transition-transform group-data-[state=open]:rotate-180"
              />
              <span className="group-data-[state=open]:hidden">Нажмите, чтобы узнать больше</span>
              <span className="hidden group-data-[state=open]:inline">Свернуть</span>
            </span>
          </div>
        </div>
        <Icon
          name="ChevronDown"
          size={22}
          className="shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=closed]:animate-pulse"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <div className="space-y-4 px-6 pb-6 pt-1 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </AccordionPrimitive.Content>
  </AccordionItem>
);

const Project = () => {
  return (
    <section id="project" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">01</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            О проекте
          </span>
        </div>

        <Accordion type="single" collapsible defaultValue="intro" className="space-y-4">
          <ProjectSection value="intro" icon="Landmark" title="Памятник предпринимателям Приморья" color="primary">
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
          </ProjectSection>

          <ProjectSection value="creation" icon="Hammer" title="Созидание и ответственность" color="accent">
            <p>
              Предпринимательство — это не только про прибыль. Это про смыслы, инициативу
              и готовность создавать то, чего ещё не существует.
            </p>
            <p>
              Предприниматели открывают предприятия, создают рабочие места, развивают
              сервисы, строят команды и берут на себя ответственность за решения, которые
              влияют на жизнь города и края.
            </p>
            <Quote>«Мы не просто ведём бизнес — мы создаём регион».</Quote>
          </ProjectSection>

          <ProjectSection
            value="territory"
            icon="Compass"
            title="Приморье как территория предпринимателей"
            color="primary"
          >
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
          </ProjectSection>

          <ProjectSection value="idea" icon="Award" title="Большая идея — признание роли" color="accent">
            <p>
              Памятник предпринимателям — это не просто объект в городской среде. Это
              высказывание общества: здесь ценят тех, кто создаёт, рискует, строит
              и оставляет после себя результат.
            </p>
            <p>
              За 20 лет Приморское отделение «ОПОРЫ РОССИИ» стало площадкой для объединения
              предпринимателей, защиты их интересов и взаимодействия с органами власти.
            </p>
            <Quote>
              «Мы несём ответственность не только за свои компании, но и за среду, в которой
              будут жить следующие поколения».
            </Quote>
          </ProjectSection>
        </Accordion>
      </div>
    </section>
  );
};

export default Project;