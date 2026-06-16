import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const container = useRef();
  
  useGSAP(() => {
    gsap.to('.marquee-text', {
      xPercent: -30, ease: 'none',
      scrollTrigger: { 
        trigger: container.current, 
        start: 'top bottom', 
        end: 'bottom top', 
        scrub: 1 
      }
    });
  }, { scope: container });

  return (
    <section className="marquee-section" ref={container}>
      <div className="marquee-container">
        <h2 className="marquee-text">ELEGANCE. REDEFINED. ELEGANCE. REDEFINED.</h2>
      </div>
    </section>
  );
}