import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Route from '@/components/sections/Route';
import Transport from '@/components/sections/Transport';
import Activities from '@/components/sections/Activities';
import Hubs from '@/components/sections/Hubs';
import Founder from '@/components/sections/Founder';
import Finish from '@/components/sections/Finish';
import Footer from '@/components/sections/Footer';

const Divider = () => <hr className="h-px bg-divider border-0 m-0" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Divider />
      <Route />
      <Divider />
      <Transport />
      <Divider />
      <Activities />
      <Divider />
      <Hubs />
      <Divider />
      <Founder />
      <Divider />
      <Finish />
      <Footer />
    </div>
  );
};

export default Index;
