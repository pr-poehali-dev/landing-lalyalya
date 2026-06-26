import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const APARTMENT_IMAGE =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/f0fdb2e7-3a6b-41bb-b126-a3937d95a032.jpg';

interface OfferModalProps {
  onBook?: () => void;
}

const SPARKLES = [
  { top: '8%', left: '12%', size: 22, delay: '0s' },
  { top: '14%', left: '85%', size: 16, delay: '0.4s' },
  { top: '70%', left: '6%', size: 18, delay: '0.8s' },
  { top: '82%', left: '90%', size: 24, delay: '0.2s' },
  { top: '40%', left: '94%', size: 14, delay: '0.6s' },
];

const OfferModal = ({ onBook }: OfferModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setOpen(true), 30000);
    return () => clearInterval(timer);
  }, []);

  if (!open) return null;

  const handleBook = () => {
    setOpen(false);
    if (onBook) {
      onBook();
    } else {
      const el = document.getElementById('booking');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0D1B2A]/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="animate-pixar-pop relative w-full max-w-md">
        <div className="absolute -inset-10 -z-10 flex items-center justify-center">
          <div className="animate-rainbow-spin h-[140%] w-[140%] rounded-full bg-[conic-gradient(from_0deg,#ff5e5e,#ffb74d,#ffe14d,#7ed957,#4dd0ff,#9b6bff,#ff5e5e)] opacity-60 blur-2xl" />
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div className="h-2 w-full bg-[linear-gradient(90deg,#ff5e5e,#ffb74d,#ffe14d,#7ed957,#4dd0ff,#9b6bff)]" />

          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white transition hover:bg-black/40"
            aria-label="Закрыть"
          >
            <Icon name="X" size={20} />
          </button>

          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="animate-sparkle pointer-events-none absolute z-10 text-[#C9A84C]"
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            >
              <Icon name="Sparkles" size={s.size} />
            </span>
          ))}

          <div className="animate-float-bob px-6 pt-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={APARTMENT_IMAGE}
                alt="Квартира в подарок"
                className="h-48 w-full object-cover"
              />
            </div>
          </div>

          <div className="px-6 pb-7 pt-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7ed957]/15 px-4 py-1.5 text-sm font-semibold text-[#3a9d2f]">
              <Icon name="Gift" size={16} />
              Только сегодня
            </div>

            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-[#0D1B2A]">
              Сегодня можете получить{' '}
              <span className="bg-[linear-gradient(90deg,#ff5e5e,#ffb74d,#9b6bff)] bg-clip-text text-transparent">
                её бесплатно!
              </span>
            </h3>

            <p className="mt-2 text-gray-500">
              Забронируйте сейчас — и первая ночь в подарок.
            </p>

            <button
              onClick={handleBook}
              className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-[#C9A84C] py-4 font-display text-base font-bold text-[#0D1B2A] transition hover:scale-[1.03]"
            >
              <span className="relative z-10">ЗАБРОНИРОВАТЬ</span>
              <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/50 [animation:shine-sweep_2.5s_ease-in-out_infinite]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
