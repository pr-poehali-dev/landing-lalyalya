import SectionHeading from '@/components/sections/SectionHeading';
import { IMAGES } from '@/data/images';

const NATURE = [
  {
    title: 'НП «Земля Леопарда»',
    text: 'Хасанский район Приморья. Следы дальневосточного леопарда, кедровая падь, японское море рядом.',
  },
  {
    title: 'Оймякон — Полюс холода',
    text: 'Участок Колымской трассы через Оймяконский улус. Самое холодное обитаемое место на Земле.',
  },
  {
    title: 'Гижигинская бухта',
    text: 'Конечная точка исторического Охотско-Гижигинского тракта — «Камчатского тракта» XVII века.',
  },
  {
    title: 'Налычевский природный парк',
    text: '140 км трейлового кольца. Горячие источники прямо на маршруте. Вулканы со всех сторон.',
  },
];

const FINAL = [
  {
    title: 'Авачинская сопка (2741 м)',
    text: 'Классическое восхождение. Вулкан виден из Петропавловска. Старт финального камчатского участка.',
  },
  {
    title: 'Вулкан Горелый',
    text: 'Кратер с кислотным озером. Один из самых доступных активных вулканов России.',
  },
  {
    title: 'Халактырский пляж',
    text: 'Чёрный вулканический песок Тихого океана. Финальная точка пешего трейла.',
  },
  {
    title: 'Долина Гейзеров',
    text: 'Опциональный вертолётный заброс. Второе по размеру гейзерное поле мира.',
  },
];

const Column = ({
  title,
  items,
}: {
  title: string;
  items: { title: string; text: string }[];
}) => (
  <div className="reveal">
    <h3 className="font-display text-xl font-semibold text-foreground mb-4">
      {title}
    </h3>
    <div className="flex flex-col gap-3">
      {items.map((it) => (
        <div
          key={it.title}
          className="flex gap-4 items-start p-4 bg-surface rounded-lg border border-border"
        >
          <div
            className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"
            aria-hidden="true"
          />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <strong className="block text-foreground font-semibold mb-1">
              {it.title}
            </strong>
            {it.text}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Activities = () => {
  return (
    <section
      id="activities"
      className="bg-background px-4 md:px-8 py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal">
          <SectionHeading
            label="Ключевые точки"
            title="Места, которые нельзя пропустить"
          />
        </div>

        <div className="reveal rounded-xl overflow-hidden my-10 md:my-12 shadow-2xl">
          <img
            src={IMAGES.activities}
            alt="Каякинг вдоль скал, велогонка через тайгу, привал у костра"
            loading="lazy"
            className="w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Column title="Природа и дикость" items={NATURE} />
          <Column title="Финал маршрута" items={FINAL} />
        </div>
      </div>
    </section>
  );
};

export default Activities;
