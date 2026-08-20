import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DONORS, TOTAL_RAISED, formatAmount, type Donor } from '@/data/donors';

const Donors = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Donor | null>(null);
  const sorted = [...DONORS].sort((a, b) => b.amount - a.amount);
  const total = TOTAL_RAISED;

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">08</span>
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
                  {DONORS.length > 0
                    ? `${DONORS.length} человек и организаций поддержали проект — нажмите, чтобы посмотреть`
                    : 'Список пока пуст — станьте первым, кто поддержит проект'}
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
                Благодарим каждого, кто поддержал создание памятника Почётным
                Предпринимателям Приморья
              </DialogDescription>
              <p className="pt-1 text-sm font-semibold text-accent">
                Всего собрано: {formatAmount(total)}
              </p>
            </DialogHeader>

            <div className="max-h-[55vh] overflow-y-auto px-6 py-2">
              {sorted.length > 0 ? (
                <ul className="divide-y divide-border">
                  {sorted.map((d) => (
                    <li key={d.name}>
                      <button
                        onClick={() => setSelected(d)}
                        title="Подробнее"
                        className="flex w-full items-center justify-between gap-4 rounded-lg py-3 text-left transition hover:bg-accent/5"
                      >
                        <span className="font-medium text-foreground">{d.name}</span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent">
                          <Icon name="Info" size={20} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Пока никто не значится в списке — станьте первым
                </p>
              )}
            </div>

            <p className="border-t border-border px-6 py-4 text-center text-sm italic text-muted-foreground">
              Список будет пополняться по мере поступления взносов
            </p>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
          <DialogContent className="max-w-md">
            {selected && (
              <>
                <DialogHeader>
                  {selected.photo ? (
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="mb-2 h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon name="User" size={26} />
                    </span>
                  )}
                  <DialogTitle className="font-display text-2xl font-bold text-primary">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="text-base font-semibold text-accent">
                    {selected.role}
                  </DialogDescription>
                </DialogHeader>
                <p className="leading-relaxed text-muted-foreground">
                  {selected.bio}
                </p>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Donors;