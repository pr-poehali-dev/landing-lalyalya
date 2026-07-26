import Icon from '@/components/ui/icon';

const VOICES = [
  {
    text: '«Предпринимательство — это не только бизнес. Это вклад в устойчивость, развитие и будущее края».',
    author: 'Предприниматель, Владивосток',
  },
  {
    text: '«Мы несём ответственность не только за свои компании, но и за среду, в которой будут жить следующие поколения».',
    author: 'Руководитель компании, Приморский край',
  },
  {
    text: '«Памятник — это признание. Это слова „спасибо“ от общества тем, кто рискует и создаёт».',
    author: 'Член «ОПОРЫ РОССИИ»',
  },
];

const Voices = () => {
  return (
    <section id="voices" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">08</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Голоса предпринимателей
          </span>
        </div>

        <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
          Те, кто строит Приморье каждый день
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <div
              key={v.author}
              className={`flex flex-col rounded-2xl border border-border p-7 shadow-sm ${
                i % 2 === 0 ? 'bg-card-blue' : 'bg-card-red'
              }`}
            >
              <Icon
                name="Quote"
                size={30}
                className={`mb-4 ${i % 2 === 0 ? 'text-primary' : 'text-accent'}`}
              />
              <p className="mb-6 flex-1 font-display text-lg font-semibold leading-relaxed text-primary">
                {v.text}
              </p>
              <p className="text-sm font-medium text-muted-foreground">— {v.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Voices;
