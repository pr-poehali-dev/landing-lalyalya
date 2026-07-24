import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface ChatItem {
  id: string;
  aiEnabled: boolean;
  lastAt: string;
  name: string | null;
  contact: string | null;
  lastMessage: string | null;
  count: number;
  lastSender: 'user' | 'ai' | 'manager' | null;
}

const playPing = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1180, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    /* ignore */
  }
};

interface Msg {
  sender: 'user' | 'ai' | 'manager';
  content: string;
  created_at: string;
}

const ChatConsole = ({
  password,
  onUnreadChange,
}: {
  password: string;
  onUnreadChange?: (n: number) => void;
}) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [reply, setReply] = useState('');
  const [unread, setUnread] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const counts = useRef<Record<string, number>>({});
  const initialized = useRef(false);
  const activeRef = useRef<string | null>(null);

  const auth = { 'X-Manager-Password': password };

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    onUnreadChange?.(Object.values(unread).filter(Boolean).length);
  }, [unread, onUnreadChange]);

  const loadChats = async () => {
    try {
      const res = await fetch(`${func2url.leads}?action=chats`, { headers: auth });
      if (!res.ok) return;
      const list: ChatItem[] = (await res.json()).chats || [];
      let ping = false;
      const nextUnread: Record<string, boolean> = {};
      for (const c of list) {
        const prev = counts.current[c.id];
        const grew = prev !== undefined && c.count > prev;
        const fromClient = c.lastSender === 'user';
        if (initialized.current && grew && fromClient && c.id !== activeRef.current) {
          nextUnread[c.id] = true;
          ping = true;
        }
        counts.current[c.id] = c.count;
      }
      if (Object.keys(nextUnread).length) {
        setUnread((u) => ({ ...u, ...nextUnread }));
      }
      if (ping) playPing();
      initialized.current = true;
      setChats(list);
    } catch {
      /* ignore */
    }
  };

  const loadChat = async (id: string) => {
    try {
      const res = await fetch(`${func2url.leads}?action=chat&chatId=${id}`, { headers: auth });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setAiEnabled(data.aiEnabled);
      }
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    loadChats();
    const t = setInterval(loadChats, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeId) return;
    setUnread((u) => ({ ...u, [activeId]: false }));
    loadChat(activeId);
    const t = setInterval(() => loadChat(activeId), 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const toggleAi = async (enabled: boolean) => {
    setAiEnabled(enabled);
    await fetch(func2url.leads, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth },
      body: JSON.stringify({ action: 'toggle_ai', chatId: activeId, aiEnabled: enabled }),
    });
  };

  const sendReply = async () => {
    const text = reply.trim();
    if (!text || !activeId) return;
    setReply('');
    setMessages((m) => [...m, { sender: 'manager', content: text, created_at: new Date().toISOString() }]);
    await fetch(func2url.leads, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth },
      body: JSON.stringify({ action: 'reply', chatId: activeId, text }),
    });
    loadChat(activeId);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-4 p-4 md:grid-cols-[300px_1fr] md:p-8">
      <div className="space-y-2">
        {chats.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">Активных чатов пока нет</p>
        )}
        {chats.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`w-full rounded-xl border p-3 text-left transition ${
              unread[c.id]
                ? 'border-primary bg-primary/10'
                : activeId === c.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:bg-surface-dynamic'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 truncate text-sm font-semibold text-foreground">
                {unread[c.id] && (
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
                )}
                {c.name || `Гость ${c.id.slice(-4)}`}
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                {unread[c.id] && (
                  <span className="rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                    NEW
                  </span>
                )}
                {!c.aiEnabled && (
                  <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-[10px] font-medium text-terracotta">
                    Оператор
                  </span>
                )}
              </span>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {c.lastMessage || '—'}
            </p>
          </button>
        ))}
      </div>

      <div className="flex h-[70vh] flex-col overflow-hidden rounded-xl border border-border bg-background">
        {!activeId ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Выберите диалог слева
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="text-sm font-semibold text-foreground">
                {chats.find((c) => c.id === activeId)?.contact ||
                  chats.find((c) => c.id === activeId)?.name ||
                  'Диалог'}
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <span className={aiEnabled ? 'text-muted-foreground' : 'font-medium text-terracotta'}>
                  {aiEnabled ? 'ИИ отвечает' : 'Отвечаю сам'}
                </span>
                <button
                  onClick={() => toggleAi(!aiEnabled)}
                  className={`relative h-6 w-11 rounded-full transition ${
                    aiEnabled ? 'bg-taiga' : 'bg-terracotta'
                  }`}
                  aria-label="Переключить ИИ"
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                      aiEnabled ? 'left-0.5' : 'left-[22px]'
                    }`}
                  />
                </button>
              </label>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'rounded-bl-md bg-background text-foreground shadow-sm'
                        : m.sender === 'manager'
                          ? 'rounded-br-md bg-terracotta text-white'
                          : 'rounded-br-md bg-primary text-primary-foreground'
                    }`}
                  >
                    <span className="mb-0.5 block text-[11px] font-semibold opacity-80">
                      {m.sender === 'user' ? 'Клиент' : m.sender === 'manager' ? 'Вы' : 'ИИ'}
                    </span>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendReply();
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={aiEnabled ? 'Отключите ИИ, чтобы ответить самому…' : 'Ваш ответ клиенту…'}
                className="flex-1 rounded-xl bg-surface px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={!reply.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                aria-label="Отправить"
              >
                <Icon name="Send" size={20} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatConsole;