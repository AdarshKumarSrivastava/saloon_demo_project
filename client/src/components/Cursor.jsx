import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let cursorX = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
    let cursorY = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});

    const onMouseMove = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
    };

    const addHover = () => cursor.classList.add('hovering');
    const removeHover = () => cursor.classList.remove('hovering');

    window.addEventListener('mousemove', onMouseMove);
    
    // Efficient hover state management
    const hoverSelectors = 'a, button, input, textarea, select, [data-cursor="hover"]';
    
    const handleMouseOver = (e) => {
      if (e.target.closest(hoverSelectors)) addHover();
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(hoverSelectors)) removeHover();
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
}
