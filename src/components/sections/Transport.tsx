import SectionHeading from '@/components/sections/SectionHeading';

const CARDS = [
  {
    icon: '🥾',
    name: 'Пешком',
    desc: 'Основа маршрута на участках без дорог. Автономные переходы через Корякию, трейлы Камчатки, тропы нацпарков Приморья. Здесь нога несёт быстрее, чем колесо.',
    km: '~2 000 км · Этапы 1, 4, 5',
  },
  {
    icon: '🚴',
    name: 'Велосипед',
    desc: 'Грунт, гравий, легендарная трасса Р504 «Колыма». Грэвел или хардтейл MTB — выбор очевиден. На колёсах — самый длинный отрезок пути через тайгу и Якутию.',
    km: '~2 500 км · Этапы 1, 2, 3',
  },
  {
    icon: '🛶',
    name: 'Каяк и байдарка',
    desc: 'Реки Алдан и Тауй на сплавном участке, западное побережье Камчатки на морском каяке. Охотское море — не для слабонервных, но вид того стоит.',
    km: '~500 км · Этапы 2, 4, 5',
  },
];

const Transport = () => {
  return (
    <section
      id="transport"
      className="bg-surface px-4 md:px-8 py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal">
          <SectionHeading
            label="Как двигаться"
            title="Три стихии, один маршрут"
            body="ВДТ — мультиспортивный трейл. Каждый этап подбирается под рельеф, а не под удобство. Здесь нет одного правильного способа двигаться."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {CARDS.map((c) => (
            <div
              key={c.name}
              className="reveal bg-surface-2 rounded-xl p-8 border border-border hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {c.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {c.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {c.desc}
              </p>
              <p className="text-xs text-primary uppercase tracking-wide font-medium">
                {c.km}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transport;
