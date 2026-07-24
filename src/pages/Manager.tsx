import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface Lead {
  id: number;
  name: string;
  contact: string;
  message: string;
  dialog: string;
  status: string;
  created_at: string;
}

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: 'Новая', cls: 'bg-primary/15 text-primary' },
  in_progress: { label: 'В работе', cls: 'bg-terracotta/15 text-terracotta' },
  done: { label: 'Завершена', cls: 'bg-taiga/15 text-taiga' },
  rejected: { label: 'Отклонена', cls: 'bg-muted text-muted-foreground' },
};

const Manager = () => {
  const [password, setPassword] = useState(() => localStorage.getItem('mgr_pass') || '');
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const load = async (pass: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(func2url.leads, {
        headers: { 'X-Manager-Password': pass },
      });
      if (res.status === 401) {
        setError('Неверный пароль');
        setAuthed(false);
        localStorage.removeItem('mgr_pass');
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setAuthed(true);
      localStorage.setItem('mgr_pass', pass);
    } catch {
      setError('Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) load(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatus = async (id: number, status: string) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(func2url.leads, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Manager-Password': password },
      body: JSON.stringify({ id, status }),
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon name="Lock" size={20} />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">Кабинет менеджера</h1>
              <p className="text-xs text-muted-foreground">Вход по паролю</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(password);
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="mb-3 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Проверяем…' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Icon name="Inbox" size={22} className="text-primary" />
          <h1 className="font-display text-lg font-bold text-foreground">Заявки</h1>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
            {leads.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => load(password)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-surface-dynamic"
          >
            <Icon name="RefreshCw" size={15} /> Обновить
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('mgr_pass');
              setAuthed(false);
              setPassword('');
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Выйти
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-3 p-4 md:p-8">
        {leads.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">Заявок пока нет</p>
        )}
        {leads.map((l) => (
          <div key={l.id} className="rounded-xl border border-border bg-background p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{l.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS[l.status]?.cls || ''}`}>
                    {STATUS[l.status]?.label || l.status}
                  </span>
                </div>
                <a href={`tel:${l.contact}`} className="text-sm text-primary hover:underline">
                  {l.contact}
                </a>
                {l.message && <p className="mt-1 text-sm text-muted-foreground">{l.message}</p>}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(l.created_at).toLocaleString('ru-RU')}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {Object.entries(STATUS).map(([key, v]) => (
                <button
                  key={key}
                  onClick={() => changeStatus(l.id, key)}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    l.status === key
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-muted-foreground hover:bg-surface-dynamic'
                  }`}
                >
                  {v.label}
                </button>
              ))}
              {l.dialog && (
                <button
                  onClick={() => setOpenId(openId === l.id ? null : l.id)}
                  className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Icon name="MessageSquare" size={14} />
                  {openId === l.id ? 'Скрыть диалог' : 'Диалог с ботом'}
                </button>
              )}
            </div>

            {openId === l.id && l.dialog && (
              <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg bg-surface p-3 text-xs text-foreground">
                {l.dialog}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
