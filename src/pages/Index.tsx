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

const Divider = () => (
  <div
    className="relative flex items-center justify-center bg-background"
    aria-hidden="true"
  >
    <span className="h-px w-full bg-divider" />
    <span className="absolute flex items-center justify-center w-9 h-9 rounded-full bg-background border border-divider text-primary/70">
      <svg width="20" height="14" viewBox="0 0 34 24" fill="none">
        <path
          d="M1 22L9 9L14 15L21 3L33 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="3" r="2.6" className="fill-primary" />
      </svg>
    </span>
  </div>
);

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