import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRegistry } from '@/hooks/useRegistry';
import type { FaqItem } from '@/types/registries';
import FaqAnswer from '@/components/faq/FaqAnswer';

const Faq = () => {
  const { items } = useRegistry<FaqItem>('faq');

  return (
    <section id="faq" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
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
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={`q${item.id}`}
              className="rounded-2xl border border-border bg-surface px-6"
            >
              <AccordionTrigger className="font-display text-lg font-bold text-primary hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                <FaqAnswer text={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
