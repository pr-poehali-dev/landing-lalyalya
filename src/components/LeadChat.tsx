import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface Msg {
  sender: 'user' | 'ai' | 'manager';
  content: string;
  created_at: string;
}

const LeadChat = ({ chatId, password }: { chatId: string; password: string }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [reply, setReply] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const auth = { 'X-Manager-Password': password };

  const load = async () => {
    try {
      const res = await fetch(`${func2url.leads}?action=chat&chatId=${chatId}`, { headers: auth });
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
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const toggleAi = async (enabled: boolean) => {
    setAiEnabled(enabled);
    await fetch(func2url.leads, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth },
      body: JSON.stringify({ action: 'toggle_ai', chatId, aiEnabled: enabled }),
    });
  };

  const sendReply = async () => {
    const text = reply.trim();
    if (!text) return;
    setReply('');
    setMessages((m) => [...m, { sender: 'manager', content: text, created_at: new Date().toISOString() }]);
    await fetch(func2url.leads, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth },
      body: JSON.stringify({ action: 'reply', chatId, text }),
    });
    load();
  };

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between gap-3 bg-surface px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">Живой диалог с клиентом</span>
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <span className={aiEnabled ? 'text-muted-foreground' : 'font-medium text-terracotta'}>
            {aiEnabled ? 'ИИ отвечает' : 'Отвечаю сам'}
          </span>
          <button
            onClick={() => toggleAi(!aiEnabled)}
            className={`relative h-5 w-9 rounded-full transition ${aiEnabled ? 'bg-taiga' : 'bg-terracotta'}`}
            aria-label="Переключить ИИ"
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                aiEnabled ? 'left-0.5' : 'left-[18px]'
              }`}
            />
          </button>
        </label>
      </div>

      <div ref={scrollRef} className="max-h-72 space-y-2 overflow-y-auto bg-background p-3">
        {messages.length === 0 && (
          <p className="py-4 text-center text-xs text-muted-foreground">Сообщений пока нет</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'rounded-bl-sm bg-surface text-foreground'
                  : m.sender === 'manager'
                    ? 'rounded-br-sm bg-terracotta text-white'
                    : 'rounded-br-sm bg-primary text-primary-foreground'
              }`}
            >
              <span className="mb-0.5 block text-[10px] font-semibold opacity-80">
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
        className="flex items-center gap-2 border-t border-border bg-background p-2"
      >
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder={aiEnabled ? 'Отключите ИИ, чтобы ответить самому…' : 'Ваш ответ клиенту…'}
          className="flex-1 rounded-lg bg-surface px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={!reply.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          aria-label="Отправить"
        >
          <Icon name="Send" size={16} />
        </button>
      </form>
    </div>
  );
};

export default LeadChat;
