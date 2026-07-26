import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default Index;
