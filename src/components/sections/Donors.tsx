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
  role: string;
  bio: string;
}

const DONORS: Donor[] = [
  {
    name: 'Дмитрий Алексеев',
    amount: 500000,
    role: 'Сооснователь сети DNS',
    bio: 'Предприниматель из Владивостока, сооснователь одной из крупнейших федеральных сетей магазинов электроники DNS. Активно поддерживает развитие делового сообщества Приморья.',
  },
  {
    name: 'ООО «Приморская торговая компания»',
    amount: 300000,
    role: 'Оптовая и розничная торговля',
    bio: 'Приморская компания с многолетней историей, работает в сфере оптовой и розничной торговли. Участвует в социальных инициативах региона.',
  },
  {
    name: 'Сергей Петров',
    amount: 150000,
    role: 'Владелец строительной компании',
    bio: 'Руководит строительной компанией во Владивостоке. Реализовал несколько значимых объектов городской инфраструктуры.',
  },
  {
    name: 'Анна Кузнецова',
    amount: 100000,
    role: 'Основатель сети кофеен',
    bio: 'Основатель локальной сети кофеен в Приморье. Развивает малый бизнес и создаёт рабочие места в регионе.',
  },
  {
    name: 'ИП Смирнов А.В.',
    amount: 75000,
    role: 'Индивидуальный предприниматель',
    bio: 'Индивидуальный предприниматель, работает в сфере услуг. Поддерживает инициативы «ОПОРЫ РОССИИ».',
  },
  {
    name: 'Игорь Волков',
    amount: 50000,
    role: 'Владелец логистической компании',
    bio: 'Развивает грузоперевозки и логистику на Дальнем Востоке. Считает важным сохранение памяти о предпринимателях.',
  },
  {
    name: 'Елена Морозова',
    amount: 30000,
    role: 'Основатель школы иностранных языков',
    bio: 'Основатель образовательного центра во Владивостоке. Вносит вклад в развитие образования в регионе.',
  },
  {
    name: 'Николай Соколов',
    amount: 20000,
    role: 'Владелец сети автосервисов',
    bio: 'Предприниматель в сфере автосервиса. Более 15 лет в бизнесе Приморского края.',
  },
  {
    name: 'Мария Титова',
    amount: 15000,
    role: 'Основатель дизайн-студии',
    bio: 'Руководит дизайн-студией во Владивостоке. Поддерживает творческие и социальные проекты города.',
  },
  {
    name: 'Владивостокский предприниматель',
    amount: 10000,
    role: 'Малый бизнес',
    bio: 'Предприниматель, пожелавший остаться неизвестным. Внёс вклад в создание памятника предпринимателям Приморья.',
  },
];

const formatAmount = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;

const Donors = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Donor | null>(null);
  const sorted = [...DONORS].sort((a, b) => b.amount - a.amount);
  const total = DONORS.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">09</span>
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
                    <button
                      onClick={() => setSelected(d)}
                      title="Подробнее"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent transition hover:bg-accent/10"
                    >
                      <Icon name="Info" size={20} />
                    </button>
                  </li>
                ))}
              </ul>
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
                  <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon name="User" size={26} />
                  </span>
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