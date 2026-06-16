import { useEffect } from 'react';
import { gsap } from 'gsap';
export default function Preloader({ onComplete }) {
  useEffect(() => {
    gsap.timeline({ onComplete })
      .to('.preloader-logo', { opacity: 0, duration: 1, delay: 0.5 })
      .to('.preloader', { yPercent: -100, duration: 1.2, ease: 'power4.inOut' });
  }, []);
  return (
    <div className="preloader">
      <div className="preloader-logo">MAISON ÉCLAT</div>
    </div>
  );
}