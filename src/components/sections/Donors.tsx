import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Donor {
  name: string;
  amount: number;
}

const DONORS: Donor[] = [
  { name: 'Дмитрий Алексеев', amount: 500000 },
  { name: 'ООО «Приморская торговая компания»', amount: 300000 },
  { name: 'Сергей Петров', amount: 150000 },
  { name: 'Анна Кузнецова', amount: 100000 },
  { name: 'ИП Смирнов А.В.', amount: 75000 },
  { name: 'Игорь Волков', amount: 50000 },
  { name: 'Елена Морозова', amount: 30000 },
  { name: 'Николай Соколов', amount: 20000 },
  { name: 'Мария Титова', amount: 15000 },
  { name: 'Владивостокский предприниматель', amount: 10000 },
];

const formatAmount = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;

const Donors = () => {
  const [open, setOpen] = useState(false);
  const sorted = [...DONORS].sort((a, b) => b.amount - a.amount);
  const total = DONORS.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">10</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Благодарность
          </span>
        </div>

        <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Те, кто приближает открытие памятника
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Памятник создаётся на добровольные взносы неравнодушных людей и организаций
          Приморья. Каждый вклад — часть общего дела.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <button
            onClick={() => setOpen(true)}
            className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-accent/20 bg-card-red px-6 py-6 text-left shadow-sm transition hover:border-accent/35 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition group-hover:bg-accent/15">
                <Icon name="HeartHandshake" size={26} />
              </span>
              <div>
                <span className="block font-display text-xl font-bold text-primary md:text-2xl">
                  Список неравнодушных
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Icon name="ChevronRight" size={14} className="shrink-0" />
                  {DONORS.length} человек и организаций поддержали проект — нажмите, чтобы посмотреть
                </span>
              </div>
            </div>
            <Icon
              name="ChevronRight"
              size={22}
              className="hidden shrink-0 text-accent transition-transform group-hover:translate-x-1 sm:block animate-pulse"
            />
          </button>

          <DialogContent className="max-h-[85vh] max-w-lg overflow-hidden p-0">
            <DialogHeader className="border-b border-border px-6 pb-4 pt-6">
              <DialogTitle className="font-display text-xl font-bold text-primary">
                Список неравнодушных
              </DialogTitle>
              <DialogDescription>
                Благодарим каждого, кто поддержал создание памятника предпринимателям
                Приморья
              </DialogDescription>
              <p className="pt-1 text-sm font-semibold text-accent">
                Всего собрано: {formatAmount(total)}
              </p>
            </DialogHeader>

            <div className="max-h-[55vh] overflow-y-auto px-6 py-2">
              <ul className="divide-y divide-border">
                {sorted.map((d) => (
                  <li
                    key={d.name}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="font-medium text-foreground">{d.name}</span>
                    <span className="shrink-0 font-display font-bold text-primary">
                      {formatAmount(d.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="border-t border-border px-6 py-4 text-center text-sm italic text-muted-foreground">
              Список будет пополняться по мере поступления взносов
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Donors;