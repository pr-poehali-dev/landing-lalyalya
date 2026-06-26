const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F] font-body text-white">
      <div className="pointer-events-none absolute -left-32 top-[-10%] h-[480px] w-[480px] rounded-full bg-[#FF4D8D] opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-[-15%] h-[520px] w-[520px] rounded-full bg-[#5B8CFF] opacity-40 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#FFD166] opacity-20 blur-[140px]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <span className="font-display text-lg font-extrabold tracking-tight">●&nbsp;ЛЯЛЯ</span>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/10">
          Связаться
        </button>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFD166]" />
          Новая версия уже здесь
        </div>

        <h1 className="font-display text-[18vw] font-extrabold leading-[0.85] tracking-tighter md:text-[14rem]">
          <span className="block bg-gradient-to-r from-[#FF4D8D] via-[#FFD166] to-[#5B8CFF] bg-clip-text text-transparent">
            ЛЯ ЛЯ ЛЯ
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-balance text-lg text-white/60 md:text-xl">
          Это первая страница вашего будущего сайта. Яркая, лёгкая
          и готовая превратиться во что угодно.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 font-display text-sm font-semibold text-black transition hover:scale-105">
            Начать
          </button>
          <button className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium transition hover:bg-white/10">
            Узнать больше
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
