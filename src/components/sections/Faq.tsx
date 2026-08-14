import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import ApplicationDialog from '@/components/ApplicationDialog';

const Faq = () => {
  return (
    <section id="faq" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">09</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            FAQ
          </span>
        </div>

        <h2 className="mb-10 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Часто задаваемые вопросы
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="q1"
            className="rounded-2xl border border-border bg-surface px-6"
          >
            <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
              Кто инициировал проект?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Проект инициирован Приморским краевым отделением «ОПОРЫ РОССИИ» в честь
              20-летия организации.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q2"
            className="rounded-2xl border border-border bg-surface px-6"
          >
            <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
              Где состоится церемония?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p className="mb-4">На сцене площади Адмирала Фокина во Владивостоке.</p>
              <a
                href="https://2gis.ru/vladivostok/geo/70030076837838956"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name="Navigation" size={16} />
                Открыть место на карте
              </a>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q3"
            className="rounded-2xl border border-border bg-surface px-6"
          >
            <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
              Когда состоится церемония?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              31 августа 2026 года. Сбор гостей в 12:30, начало церемонии в 13:00.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q4"
            className="rounded-2xl border border-border bg-surface px-6"
          >
            <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
              Как принять участие в церемонии?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p className="mb-4">Заполните короткую форму заявки:</p>
              <ApplicationDialog>
                <button className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90">
                  Принять участие
                  <Icon name="ArrowRight" size={16} />
                </button>
              </ApplicationDialog>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q5"
            className="rounded-2xl border border-border bg-surface px-6"
          >
            <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
              Как можно поддержать проект?
            </AccordionTrigger>
            <AccordionContent className="space-y-6 leading-relaxed text-muted-foreground">
              <div>
                <p className="mb-1 font-display text-base font-bold text-primary">
                  Стать партнёром
                </p>
                <p className="mb-3">
                  Выполните работы или окажите услуги для проекта: полиграфия, фото- и
                  видеосъёмка, другие услуги или товары на бартерной основе. Можно
                  предложить свой вариант участия.
                </p>
                <a
                  href="#support"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Стать партнёром
                </a>
              </div>
              <div>
                <p className="mb-1 font-display text-base font-bold text-primary">
                  Стать финансовым партнёром
                </p>
                <p className="mb-3">
                  Внесите любую сумму на создание памятного знака и капсулы времени для
                  будущих поколений.
                </p>
                <a
                  href="#support"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  Внести сумму
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q6"
            className="rounded-2xl border border-border bg-surface px-6"
          >
            <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
              Когда будет вскрыта капсула времени?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Капсула времени будет вскрыта в 2046 году.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;