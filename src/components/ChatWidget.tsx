import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content:
    'Привет! Я консультант Великого Дальневосточного Трейла. Спрашивайте про маршрут, сроки, снаряжение и участие — помогу разобраться.',
};

const QUICK = ['Какой маршрут?', 'Сколько длится?', 'Как принять участие?'];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open, showLead, sent]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(func2url.consultant, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.reply || 'Не получилось ответить, попробуйте ещё раз.' },
      ]);
      if (data.offerLead) setShowLead(true);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Связь прервалась. Попробуйте написать ещё раз.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitLead = async () => {
    if (!lead.name.trim() || !lead.contact.trim()) return;
    const dialog = messages
      .map((m) => `${m.role === 'user' ? 'Клиент' : 'Бот'}: ${m.content}`)
      .join('\n');
    try {
      const res = await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, dialog }),
      });
      if (res.ok) {
        setSent(true);
        setShowLead(false);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition hover:scale-110"
        aria-label="Открыть чат с консультантом"
      >
        <Icon name={open ? 'X' : 'MessageCircle'} size={28} />
        {!open && (
          <span className="absolute right-0 top-0 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-taiga opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-taiga" />
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[90] flex h-[32rem] max-h-[70vh] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
          <div className="flex items-center gap-3 bg-primary px-5 py-4 text-primary-foreground">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15">
              <Icon name="Mountain" size={22} />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold">Консультант трейла</div>
              <div className="flex items-center gap-1.5 text-xs opacity-80">
                <span className="h-2 w-2 rounded-full bg-taiga" />
                Отвечает ИИ • обычно за минуту
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-primary text-primary-foreground'
                      : 'rounded-bl-md bg-background text-foreground shadow-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-background px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-primary"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-primary/40 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-primary/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {showLead && !sent && (
              <div className="space-y-2 rounded-2xl border border-border bg-background p-3">
                <p className="text-sm font-semibold text-foreground">Оставьте заявку менеджеру</p>
                <input
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  value={lead.contact}
                  onChange={(e) => setLead({ ...lead, contact: e.target.value })}
                  placeholder="Телефон или e-mail"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <textarea
                  value={lead.message}
                  onChange={(e) => setLead({ ...lead, message: e.target.value })}
                  placeholder="Комментарий (необязательно)"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  onClick={submitLead}
                  disabled={!lead.name.trim() || !lead.contact.trim()}
                  className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                  Отправить заявку
                </button>
              </div>
            )}

            {sent && (
              <div className="flex gap-2 rounded-2xl border border-taiga/40 bg-taiga/15 p-3 text-sm text-foreground">
                <Icon name="CircleCheck" size={18} className="mt-0.5 shrink-0 text-taiga" />
                Заявка отправлена! Менеджер свяжется с вами в ближайшее время.
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ваш вопрос…"
              className="flex-1 rounded-xl bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              aria-label="Отправить"
            >
              <Icon name="Send" size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
