import Icon from '@/components/ui/icon';

interface Application {
  id: number;
  created_at: string | null;
}

interface AdminStatsProps {
  items: Application[];
}

const formatDay = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const AdminStats = ({ items }: AdminStatsProps) => {
  const byDay = items.reduce<Record<string, number>>((acc, item) => {
    if (!item.created_at) return acc;
    const day = formatDay(item.created_at);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const days = Object.entries(byDay).sort((a, b) => {
    const [da, ma, ya] = a[0].split('.').map(Number);
    const [db, mb, yb] = b[0].split('.').map(Number);
    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
  });

  const maxCount = Math.max(1, ...days.map(([, count]) => count));

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon name="Users" size={22} />
        </span>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Всего участников церемонии
        </p>
        <p className="mt-1.5 font-display text-3xl font-extrabold text-primary">
          {items.length}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:col-span-2">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Icon name="BarChart3" size={22} />
          </span>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Заявки по дням
          </p>
        </div>

        {days.length === 0 ? (
          <p className="text-sm text-muted-foreground">Пока нет данных для статистики.</p>
        ) : (
          <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
            {days.map(([day, count]) => (
              <div key={day} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">{day}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm font-semibold text-primary">
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
