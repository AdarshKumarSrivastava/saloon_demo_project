import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import Story from './sections/Story';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import Booking from './sections/Booking';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Pricing />
        <Story />
        <Stats />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}

export default App;
