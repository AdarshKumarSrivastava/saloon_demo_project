import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const container = useRef();
  
  useGSAP(() => {
    gsap.timeline({ 
      scrollTrigger: { 
        trigger: container.current, 
        start: 'top top', 
        end: '+=200%', 
        pin: true, 
        scrub: 1.5 
      } 
    })
    .to('.service-card', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.2, ease: 'power2.out' });
  }, { scope: container });

  return (
    <section className="services-section" id="services" ref={container}>
      <div className="services-container">
        <div className="section-header center">
          <h2 className="section-title">Bespoke Services</h2>
        </div>
        <div className="cards-wrapper">
          <div className="service-card"><div className="card-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80')"}}></div><div className="card-content"><h3>Hair Artistry</h3></div></div>
          <div className="service-card"><div className="card-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80')"}}></div><div className="card-content"><h3>Skin Alchemy</h3></div></div>
          <div className="service-card"><div className="card-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80')"}}></div><div className="card-content"><h3>The Ritual</h3></div></div>
        </div>
      </div>
    </section>
  );
}