import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface Message {
  sender: 'user' | 'ai' | 'manager';
  content: string;
}

const GREETING: Message = {
  sender: 'ai',
  content:
    'Привет! Я консультант Великого Дальневосточного Трейла. Спрашивайте про маршрут, сроки, снаряжение и участие — помогу разобраться.',
};

const QUICK = ['Какой маршрут?', 'Сколько длится?', 'Как принять участие?'];

const getChatId = () => {
  let id = localStorage.getItem('vdt_chat_id');
  if (!id) {
    id = 'c_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('vdt_chat_id', id);
  }
  return id;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', phone: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatId = useRef(getChatId());

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open, showLead, sent]);

  const applyServer = (data: { messages?: Message[]; aiEnabled?: boolean; offerLead?: boolean }) => {
    if (Array.isArray(data.messages)) {
      setMessages(data.messages.length ? data.messages : [GREETING]);
    }
    if (typeof data.aiEnabled === 'boolean') setAiEnabled(data.aiEnabled);
    if (data.offerLead) setShowLead(true);
  };

  // Поллинг: подхватываем ответы менеджера в реальном времени
  useEffect(() => {
    if (!open) return;
    const poll = async () => {
      try {
        const res = await fetch(`${func2url.consultant}?chatId=${chatId.current}`);
        if (res.ok) applyServer(await res.json());
      } catch {
        /* ignore */
      }
    };
    poll();
    const t = setInterval(poll, 4000);
    return () => clearInterval(t);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((m) => [...m, { sender: 'user', content: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(func2url.consultant, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: chatId.current, text: trimmed }),
      });
      applyServer(await res.json());
    } catch {
      setMessages((m) => [
        ...m,
        { sender: 'ai', content: 'Связь прервалась. Попробуйте написать ещё раз.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitLead = async () => {
    if (!lead.name.trim() || !lead.phone.trim()) return;
    const dialog = messages
      .map((m) => `${m.sender === 'user' ? 'Клиент' : m.sender === 'manager' ? 'Менеджер' : 'Бот'}: ${m.content}`)
      .join('\n');
    const contact = [lead.phone.trim(), lead.contact.trim()].filter(Boolean).join(' · ');
    try {
      const res = await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          contact,
          message: lead.message,
          dialog,
          chatId: chatId.current,
        }),
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
              <Icon name={aiEnabled ? 'Mountain' : 'Headset'} size={22} />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold">
                {aiEnabled ? 'Консультант трейла' : 'Менеджер на связи'}
              </div>
              <div className="flex items-center gap-1.5 text-xs opacity-80">
                <span className="h-2 w-2 rounded-full bg-taiga" />
                {aiEnabled ? 'Отвечает ИИ • обычно за минуту' : 'С вами общается специалист'}
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'rounded-br-md bg-primary text-primary-foreground'
                      : 'rounded-bl-md bg-background text-foreground shadow-sm'
                  }`}
                >
                  {m.sender === 'manager' && (
                    <span className="mb-0.5 block text-[11px] font-semibold text-primary">Менеджер</span>
                  )}
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
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  placeholder="Номер телефона"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  type="email"
                  value={lead.contact}
                  onChange={(e) => setLead({ ...lead, contact: e.target.value })}
                  placeholder="E-mail (необязательно)"
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
                  disabled={!lead.name.trim() || !lead.phone.trim()}
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

          {!showLead && !sent && aiEnabled && (
            <button
              onClick={() => setShowLead(true)}
              className="flex items-center justify-center gap-1.5 border-t border-border bg-surface px-3 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <Icon name="Headset" size={16} />
              Связаться с менеджером
            </button>
          )}

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
