import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />

      <main className="container pt-32 pb-24">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
          Блок 1 — Навигация готова
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight max-w-3xl">
          Великий Дальневосточный Трейл
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Владивосток → Камчатка
        </p>
      </main>
    </div>
  );
};

export default Index;
