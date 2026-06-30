import Icon from '@/components/ui/icon';
import { IMAGES } from '@/data/images';

const Finish = () => {
  return (
    <section
      id="join"
      className="relative overflow-hidden min-h-[80vh] flex flex-col justify-end"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.finish}')` }}
        role="img"
        aria-label="Камчатка ночью — вулканическое зарево"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="relative z-[2] text-center max-w-[960px] mx-auto w-full px-4 md:px-8 pt-8 pb-20">
        <p className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.12em] text-primary mb-4 before:block before:w-[18px] before:h-px before:bg-primary">
          Финал маршрута
        </p>
        <h2 className="font-display text-[clamp(2.5rem,1rem+4vw,5rem)] font-bold text-foreground mb-6 leading-tight">
          Петропавловск-Камчатский.
          <br />
          <em className="italic text-primary">6 000 км позади.</em>
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Этот маршрут ждёт первопроходцев, документаторов, волонтёров
          трейл-хабов и тех, кто просто хочет пройти его однажды. Следите за
          проектом — он живой.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <a
            href="mailto:info@vdt-trail.ru"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
          >
            Написать Стёпе <Icon name="ArrowRight" size={16} />
          </a>
          <a
            href="#route"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border/60 text-muted-foreground text-sm hover:text-foreground hover:border-muted-foreground hover:bg-surface-dynamic transition-all"
          >
            Посмотреть маршрут ещё раз
          </a>
        </div>
      </div>
    </section>
  );
};

export default Finish;
