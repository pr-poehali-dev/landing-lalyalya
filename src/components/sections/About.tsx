import { IMAGES } from '@/data/images';

const About = () => {
  return (
    <section
      id="about"
      className="bg-surface px-4 md:px-8 py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="reveal">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-primary mb-4 before:block before:w-[18px] before:h-px before:bg-primary">
              Зачем этот трейл
            </p>
            <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold leading-tight text-foreground mb-4">
              Самый дикий маршрут России
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Дальний Восток — последнее по-настоящему необжитое пространство
              Земли. Здесь нет толп туристов, нет инстаграмных очередей к закату.
              Только тайга, реки, медведи и 9 часовых поясов до ближайшего кофе.
            </p>
            <blockquote className="font-display text-xl md:text-2xl italic text-primary leading-snug my-8 pl-6 border-l-2 border-primary">
              «Не бывает слишком долгих маршрутов. Бывают слишком короткие
              отпуска.»
            </blockquote>
            <p className="text-base text-muted-foreground leading-relaxed">
              ВДТ — это исторический коридор, по которому шли первопроходцы
              XVII–XIX веков: Охотский тракт, Охотско-Гижигинский тракт — пути,
              связывавшие Сибирь с Тихим океаном задолго до любых дорог. Мы
              возрождаем их и облагораживаем стоянки на каждом ключевом участке.
            </p>
          </div>

          <div className="reveal relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl order-first md:order-last">
            <img
              src={IMAGES.about}
              alt="Аэропанорама Дальнего Востока — от тайги Приморья до вулканов Камчатки"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent text-xs text-white/70 tracking-wide">
              Владивосток → Якутия → Магадан → Камчатка
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
