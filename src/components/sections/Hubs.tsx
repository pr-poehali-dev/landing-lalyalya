import SectionHeading from '@/components/sections/SectionHeading';

const HUBS = [
  {
    type: 'Тип 1',
    name: 'Дикий хаб',
    features: [
      'Кострище с защитным кольцом',
      'Тент-навес и деревянный стол',
      'Контейнер с дровами',
      'Журнал трейла + ящик для записок',
      'QR-код → GPS следующей точки',
    ],
  },
  {
    type: 'Тип 2',
    name: 'Посёлковый хаб',
    features: [
      'Договорённость с местными о ночлеге',
      'Баня или место в сарае',
      'Пополнение воды и продуктов',
      'Ремонт снаряжения у местных',
      'Связь с МЧС через старосту',
    ],
  },
  {
    type: 'Тип 3',
    name: 'Городской хаб',
    features: [
      'Хостел с меткой «ВДТ-партнёр»',
      'Хранение снаряжения',
      'Почтовый ящик для заброски еды',
      'Ремонт велосипеда / каяка',
      'Базы: Тында, Якутск, Магадан, ПКЧ',
    ],
  },
];

const Hubs = () => {
  return (
    <section
      id="hubs"
      className="bg-surface px-4 md:px-8 py-[clamp(4rem,8vw,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal">
          <SectionHeading
            label="Инфраструктура"
            title="Три типа трейл-хабов"
            body="Ключевая идея ВДТ — облагородить маршрут без потери дикости. Мы не строим отели. Мы создаём точки жизни в тундре."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {HUBS.map((h) => (
            <div
              key={h.type}
              className="reveal bg-surface-2 rounded-xl overflow-hidden border border-border hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <div className="px-6 pt-8 pb-6 bg-gradient-to-br from-surface-offset to-surface-dynamic">
                <p className="text-xs uppercase tracking-[0.1em] text-primary mb-3 font-medium">
                  {h.type}
                </p>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {h.name}
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-3">
                  {h.features.map((f) => (
                    <div key={f} className="flex gap-3 items-start">
                      <div
                        className="w-[5px] h-[5px] rounded-full bg-muted-foreground shrink-0 mt-2"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-muted-foreground leading-snug">
                        {f}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hubs;
