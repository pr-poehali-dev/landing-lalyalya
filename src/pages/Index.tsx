import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Values from '@/components/sections/Values';
import Project from '@/components/sections/Project';
import Entrepreneurs from '@/components/sections/Entrepreneurs';
import WhyImportant from '@/components/sections/WhyImportant';
import Ceremony from '@/components/sections/Ceremony';

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <Hero />
        <Values />
        <Project />
        <Entrepreneurs />
        <WhyImportant />
        <Ceremony />
      </main>
    </div>
  );
};

export default Index;