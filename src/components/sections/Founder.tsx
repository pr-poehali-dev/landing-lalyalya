import { IMAGES } from '@/data/images';

const Founder = () => {
  return (
    <section
      id="founder"
      className="bg-background px-4 md:px-8 py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[400px_1fr] gap-10 md:gap-16 items-center">
          <div className="reveal relative rounded-2xl overflow-hidden aspect-square shadow-2xl max-w-[320px] md:max-w-none">
            <img
              src={IMAGES.founder}
              alt="Стёпа Молодец — создатель маршрута ВДТ"
              loading="lazy"
              className="w-full h-full object-cover object-[60%_30%]"
            />
            <div className="absolute bottom-5 left-5 bg-background/90 backdrop-blur-md px-5 py-3 rounded-lg border border-border/50">
              <div className="font-display text-lg font-bold text-foreground">
                Стёпа Молодец
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Создатель маршрута · Идейный вдохновитель
              </div>
            </div>
          </div>

          <div className="reveal">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-primary mb-4 before:block before:w-[18px] before:h-px before:bg-primary">
              Человек, который придумал
            </p>
            <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold text-foreground mb-6 leading-tight">
              «Я просто посмотрел на карту и{' '}
              <em className="italic text-primary">не смог остановиться</em>»
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Стёпа Молодец — путешественник, трейлраннер и идеолог, который
              увидел в Дальнем Востоке не проблему труднодоступности, а
              нераскрытый потенциал. Там, где другие видят «нет дорог», он видит
              маршрут.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Идея ВДТ родилась из простого вопроса: можно ли добраться из
              Владивостока до Камчатки своими ногами? Ответ оказался
              «теоретически да» — и этого было достаточно, чтобы начать.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Сегодня Стёпа разрабатывает точки трейл-хабов, договаривается с
              местными сообществами и документирует каждый участок — чтобы
              первопроходческий маршрут стал открытым и живым.
            </p>
            <blockquote className="px-6 md:px-8 py-6 rounded-xl bg-primary-highlight border-l-[3px] border-primary font-display text-lg italic text-foreground leading-snug">
              «Дальний Восток — не конец России. Это её начало. Великий
              Дальневосточный Трейл — первый шаг к тому, чтобы это поняли все.»
              <br />
              <br />— Стёпа Молодец
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;