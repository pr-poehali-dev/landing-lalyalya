import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useSiteImage } from '@/hooks/useSiteSettings';

const MONUMENT_IMG_FALLBACK =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/9cbd1e9a-0bc5-40b5-a600-133269b0f520.png';

const Monument = () => {
  const MONUMENT_IMG = useSiteImage('monument_image', MONUMENT_IMG_FALLBACK);

  return (
    <section id="monument" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">04</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Памятный знак
          </span>
        </div>

        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
            Памятный знак
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Это не декоративный объект, а символ предпринимательской инициативы,
            созидания и ответственности за будущее региона.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src={MONUMENT_IMG}
                alt="Концепт памятного знака"
                className="h-full max-h-[520px] w-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Иллюстративная визуализация концепции
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible className="mb-6 space-y-4">
              <AccordionItem
                value="history"
                className="rounded-2xl border border-border bg-background px-6"
              >
                <AccordionTrigger className="font-display text-xl font-bold text-primary hover:no-underline">
                  165 лет истории предпринимательства
                </AccordionTrigger>
                <AccordionContent className="space-y-3 leading-relaxed text-muted-foreground">
                  <p>
                    История Приморского края — это история людей действия. Предприниматели,
                    купцы и промышленники из разных стран развивали торговлю, производство,
                    порты и международные связи.
                  </p>
                  <p>
                    Памятник станет знаком признания: этот регион создавался людьми,
                    которые умели видеть возможности, принимать решения и строить будущее.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="contest"
                className="rounded-2xl border border-border bg-background px-6"
              >
                <AccordionTrigger className="font-display text-xl font-bold text-primary hover:no-underline">
                  Конкурс и реализация
                </AccordionTrigger>
                <AccordionContent className="space-y-3 leading-relaxed text-muted-foreground">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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