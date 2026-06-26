const HERO_IMAGE =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/75ddd54e-31c1-4eef-b079-f3ee728a5ec9.jpg';

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
    </div>
  );
};

export default Index;
