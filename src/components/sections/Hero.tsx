import Icon from '@/components/ui/icon';
import { IMAGES } from '@/data/images';

const STATS = [
  { num: '6 000', label: 'километров' },
  { num: '6', label: 'этапов' },
  { num: '4–6', label: 'месяцев пути' },
  { num: '40+', label: 'трейл-хабов' },
];

const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
      aria-label="Главный экран"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${IMAGES.hero}')`,
          backgroundPosition: 'center 30%',
        }}
        role="img"
        aria-label="Путник на хребте Дальнего Востока"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="relative z-[2] w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-primary mb-6 before:block before:w-6 before:h-px before:bg-primary">
          Первый мультиспортивный маршрут Дальнего Востока
        </p>

        <h1 className="font-display font-bold leading-[0.95] tracking-tight text-foreground mb-6 max-w-[14ch] text-[clamp(3rem,0.5rem+7vw,8rem)]">
          Великий <em className="italic text-primary">Дальневосточный</em> Трейл
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-[55ch] mb-10 leading-relaxed">
          6 000 км от Тихого океана до вулканов Камчатки. Пешком, на велосипеде и
          каяке — через тайгу, Колыму и Охотское побережье.
        </p>

        <div className="flex flex-wrap gap-8 mb-10">
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="block font-display text-3xl md:text-4xl font-bold text-primary leading-none">
                {s.num}
              </span>
              <span className="block text-xs text-muted-foreground uppercase tracking-[0.08em] mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="#route"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
          >
            Изучить маршрут <Icon name="ArrowDown" size={16} />
          </a>
          <a
            href="#founder"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border/60 text-muted-foreground text-sm hover:text-foreground hover:border-muted-foreground hover:bg-surface-dynamic transition-all"
          >
            Об идейном вдохновителе
          </a>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 right-8 z-[2] flex-col items-center gap-2 text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-[0.1em] animate-float-bob">
        <Icon name="MousePointer2" size={16} />
        <span>Прокрути</span>
      </div>
    </section>
  );
};

export default Hero;