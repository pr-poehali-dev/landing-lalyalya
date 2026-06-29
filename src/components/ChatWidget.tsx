import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const CHAT_URL = 'https://functions.poehali.dev/33893b81-1ef3-427f-8fdd-db3e2c156058';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content:
    'Здравствуйте! Я Юра, консультант «Квартиры у моря». Спрашивайте про квартиры, цены, заселение или документы — отвечу за секунду 🌊',
};

const QUICK = [
  'Как заселиться?',
  'Какие есть квартиры?',
  'Нужны документы для командировки',
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Связь прервалась. Напишите нам в Telegram @username или позвоните +7 (423) 200-00-00.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#0D1B2A] shadow-xl transition hover:scale-110"
        aria-label="Открыть чат"
      >
        <Icon name={open ? 'X' : 'MessageCircle'} size={28} className="icon-animated" />
        {!open && (
          <span className="absolute right-0 top-0 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ed957] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#7ed957]" />
          </span>
        )}
      </button>

      {open && (
        <div className="animate-pixar-pop fixed bottom-24 right-6 z-[90] flex h-[32rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-[#0D1B2A] px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A84C] text-[#0D1B2A]">
              <Icon name="Sparkles" size={22} />
            </div>
            <div>
              <div className="font-display font-bold text-white">Юра — консультант</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <span className="h-2 w-2 rounded-full bg-[#7ed957]" />
                Онлайн 24/7
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F8F9FA] p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-[#C9A84C] text-[#0D1B2A]'
                      : 'rounded-bl-md bg-white text-[#0D1B2A] shadow-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-[#C9A84C]"
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
                    className="rounded-full border border-[#C9A84C]/40 bg-white px-3 py-1.5 text-xs font-medium text-[#0D1B2A] transition hover:bg-[#C9A84C]/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите вопрос…"
              className="flex-1 rounded-xl bg-[#F8F9FA] px-4 py-3 text-sm text-[#0D1B2A] outline-none transition focus:ring-2 focus:ring-[#C9A84C]/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A84C] text-[#0D1B2A] transition hover:bg-[#d8b95e] disabled:opacity-50"
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
