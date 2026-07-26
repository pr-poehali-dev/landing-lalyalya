import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Values from '@/components/sections/Values';
import Project from '@/components/sections/Project';
import Entrepreneurs from '@/components/sections/Entrepreneurs';
import WhyImportant from '@/components/sections/WhyImportant';
import Ceremony from '@/components/sections/Ceremony';
import Monument from '@/components/sections/Monument';
import TimeCapsule from '@/components/sections/TimeCapsule';
import Location from '@/components/sections/Location';
import Voices from '@/components/sections/Voices';

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
        <Monument />
        <TimeCapsule />
        <Location />
        <Voices />
      </main>
    </div>
  );
};

export default Index;