import Icon from '@/components/ui/icon';
import { CHANGELOG, type ChangeType } from '@/data/changelog';

const TYPE_CONFIG: Record<ChangeType, { label: string; icon: string; className: string }> = {
  feature: { label: 'Новое', icon: 'Sparkles', className: 'bg-accent/10 text-accent' },
  fix: { label: 'Исправление', icon: 'Wrench', className: 'bg-primary/10 text-primary' },
  chore: { label: 'Обновление', icon: 'RefreshCw', className: 'bg-muted text-muted-foreground' },
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
};

const Log = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Icon name="BookOpen" size={24} className="text-accent" />
          </span>
          <h1 className="font-display text-3xl font-extrabold text-primary md:text-4xl">
            Бортовой журнал
          </h1>
          <p className="mt-2 text-muted-foreground">
            История изменений проекта «Памятник Почётным Предпринимателям Приморья»
          </p>
          <a
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться на сайт
          </a>
        </div>

        <div className="space-y-10">
          {CHANGELOG.map((day) => (
            <div key={day.date} className="relative pl-6">
              <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <div className="absolute left-[4px] top-4 bottom-[-2.5rem] w-px bg-border last:hidden" />

              <p className="mb-3 font-display text-lg font-bold text-primary">
                {formatDate(day.date)}
              </p>

              <div className="space-y-3">
                {day.entries.map((entry, i) => {
                  const cfg = TYPE_CONFIG[entry.type];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.className}`}
                      >
                        <Icon name={cfg.icon} size={16} />
                      </span>
                      <div>
                        <span
                          className={`mb-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.className}`}
                        >
                          {cfg.label}
                        </span>
                        <p className="leading-relaxed text-foreground">{entry.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Log;
