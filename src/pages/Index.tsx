import Icon from '@/components/ui/icon';

const HERO_IMAGE =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/75ddd54e-31c1-4eef-b079-f3ee728a5ec9.jpg';

const FEATURES = [
  {
    icon: 'KeyRound',
    title: 'Заселение 24/7 без ключей',
    text: 'Умный замок открывается кодом на телефоне. Прилетаете в 3 ночи? Всё будет готово.',
  },
  {
    icon: 'FileText',
    title: 'Документы для командировки',
    text: 'Договор, акт, чек — всё с печатью. Принимается в любой бухгалтерии.',
  },
  {
    icon: 'Bath',
    title: 'Как дома, только лучше',
    text: 'Полная кухня, стиральная машина, кофемашина, Smart TV, уборка включена.',
  },
  {
    icon: 'Waves',
    title: 'Вид на море или в центре',
    text: 'Квартиры у Амурского залива, в центре и у вокзала — выберите локацию.',
  },
  {
    icon: 'Wallet',
    title: 'На 30–40% дешевле отеля',
    text: 'Те же удобства, своя кухня, никакой комиссии агрегаторов.',
  },
  {
    icon: 'MessageCircle',
    title: 'Поддержка за 5 минут',
    text: 'Пишите в WhatsApp, Telegram или звоните — ответим быстрее ресепшена.',
  },
];

const Index = () => {
  return (
    <div className="font-body">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0D1B2A]">
        <img
          src={HERO_IMAGE}
          alt="Панорамная квартира с видом на море во Владивостоке"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/50 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Квартиры у моря во Владивостоке — заселение за 5 минут без ожидания
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
              Апартаменты с дизайнерским ремонтом, видом на Амурский залив и
              умным замком. Заселяйтесь в любое время — ключи не нужны.
            </p>

            <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-8 py-4 font-display text-base font-semibold text-[#0D1B2A] transition hover:scale-105 hover:bg-[#d8b95e]">
              → Выбрать квартиру и забронировать
            </button>

            <ul className="mt-8 flex flex-col gap-3 text-gray-200 sm:flex-row sm:flex-wrap sm:gap-6">
              {[
                'Без комиссии агрегаторов',
                'Договор и чек для бухгалтерии',
                'Ответим за 5 минут',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A84C] text-xs font-bold text-[#0D1B2A]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FA] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0D1B2A] md:text-5xl">
              Почему 847 гостей выбрали нас вместо отеля
            </h2>
            <p className="mt-5 text-lg text-gray-600 md:text-xl">
              Отели берут деньги за завтрак, который вам не нужен. Агрегаторы
              добавляют 15–20% комиссии. Мы — нет.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#C9A84C] text-[#C9A84C]">
                  <Icon name={feature.icon} size={28} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#0D1B2A]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;