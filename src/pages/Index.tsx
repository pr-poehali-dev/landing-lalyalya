import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutOrgDialog from '@/components/AboutOrgDialog';
import Hero from '@/components/sections/Hero';
import Project from '@/components/sections/Project';
import GreatEntrepreneurs from '@/components/sections/GreatEntrepreneurs';
import WhyImportant from '@/components/sections/WhyImportant';
import Ceremony from '@/components/sections/Ceremony';
import Monument from '@/components/sections/Monument';
import TimeCapsule from '@/components/sections/TimeCapsule';
import Location from '@/components/sections/Location';
import Support from '@/components/sections/Support';
import Donors from '@/components/sections/Donors';
import Faq from '@/components/sections/Faq';
import Organizers from '@/components/sections/Organizers';
import FinalCta from '@/components/sections/FinalCta';

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <Hero />
        <Project />
        <GreatEntrepreneurs />
        <WhyImportant />
        <Ceremony />
        <Monument />
        <TimeCapsule />
        <Location />
        <Support />
        <Donors />
        <Faq />
        <Organizers />
        <FinalCta />
      </main>
      <Footer />
      <AboutOrgDialog />
    </div>
  );
};

export default Index;