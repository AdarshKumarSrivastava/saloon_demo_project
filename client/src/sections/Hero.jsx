import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef();
  
  useGSAP(() => {
    // Reveal text after preloader
    const tl = gsap.timeline();
    tl.to('.hero-content', { opacity: 1, duration: 1, delay: 1 })
      .from('.display-text', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.5");

    gsap.to('.hero-window', {
      width: '100vw', height: '100vh', ease: 'none',
      scrollTrigger: { 
        trigger: container.current, 
        start: 'top top', 
        end: '+=150%', 
        scrub: 1.5, 
        pin: true 
      }
    });
  }, { scope: container });

  return (
    <section className="hero" id="hero" ref={container}>
      <div className="hero-window">
        <div className="hero-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?auto=format&fit=crop&w=1920&q=80')"}}></div>
      </div>
      <div className="hero-content">
        <h1 className="display-text">REVEAL<br/>YOUR<br/>ESSENCE</h1>
      </div>
    </section>
  );
}