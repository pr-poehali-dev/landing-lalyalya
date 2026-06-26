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

const APARTMENTS = [
  {
    image:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/bd1da464-6eba-4c91-b1d8-d67cebf71efb.jpg',
    title: 'Студия у моря',
    address: 'ул. Набережная, 12 · Амурский залив',
    beds: '1 спальное место',
    area: '32 м²',
    amenities: ['Кухня', 'Smart TV', 'Вид на залив', 'Умный замок'],
    price: 'от 3 200 ₽/ночь',
  },
  {
    image:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/aa20563f-f97c-42d2-bff6-f94430f4ab4a.jpg',
    title: 'Апартаменты в центре',
    address: 'ул. Светланская, 45 · Центр города',
    beds: '4 спальных места',
    area: '54 м²',
    amenities: ['Полная кухня', 'Стиральная машина', 'Кофемашина', 'Парковка'],
    price: 'от 4 800 ₽/ночь',
  },
  {
    image:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/f0fdb2e7-3a6b-41bb-b126-a3937d95a032.jpg',
    title: 'Семейные апартаменты',
    address: 'ул. Морская, 8 · У вокзала',
    beds: '6 спальных мест',
    area: '78 м²',
    amenities: ['2 спальни', 'Панорамный вид', 'Посудомойка', 'Уборка включена'],
    price: 'от 6 500 ₽/ночь',
  },
];

const REVIEWS = [
  {
    text: 'Прилетели поздно ночью, заселились по коду без всякого ресепшена. Квартира — точь-в-точь как на фото, вид на залив шикарный. Вернёмся снова!',
    name: 'Анна Ковалёва',
    meta: 'Москва · отпуск с семьёй',
  },
  {
    text: 'Был в командировке, нужны были документы для бухгалтерии — выдали договор и чек с печатью без вопросов. Дешевле отеля, а удобств больше.',
    name: 'Дмитрий Соколов',
    meta: 'Новосибирск · командировка',
  },
  {
    text: 'Отвечали в Telegram за пару минут на любой вопрос. Кофемашина, стиралка, своя кухня — жили как дома. Однозначно рекомендую.',
    name: 'Елена Морозова',
    meta: 'Хабаровск · рабочая поездка',
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

      <section className="bg-[#0D1B2A] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Выберите свою квартиру
            </h2>
            <p className="mt-5 text-lg text-gray-300 md:text-xl">
              От уютной студии у моря до просторных апартаментов для семьи
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {APARTMENTS.map((apt) => (
              <div
                key={apt.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-[#1A2C3D] shadow-lg transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={apt.image}
                    alt={apt.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {apt.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{apt.address}</p>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <Icon name="BedDouble" size={18} className="text-[#C9A84C]" />
                      {apt.beds}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="Maximize" size={18} className="text-[#C9A84C]" />
                      {apt.area}
                    </span>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {apt.amenities.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 font-display text-2xl font-bold text-[#C9A84C]">
                    {apt.price}
                  </div>

                  <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C9A84C] px-6 py-3 font-display text-sm font-semibold text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-[#0D1B2A]">
                    Смотреть и бронировать →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FA] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0D1B2A] md:text-5xl">
              Что говорят наши гости
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <div className="flex gap-1 text-[#C9A84C]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="fill-[#C9A84C]" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-gray-700">«{review.text}»</p>
                <div className="mt-6">
                  <div className="font-bold text-[#0D1B2A]">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;