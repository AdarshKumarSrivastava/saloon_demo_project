// --- 1. Lenis Setup ---
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);


// --- 2. Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]');

// Ensure cursor runs efficiently using quickTo
let cursorX = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "power3"});
let cursorY = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "power3"});
let outlineX = gsap.quickTo(cursorOutline, "x", {duration: 0.3, ease: "power3"});
let outlineY = gsap.quickTo(cursorOutline, "y", {duration: 0.3, ease: "power3"});

window.addEventListener('mousemove', (e) => {
  cursorX(e.clientX);
  cursorY(e.clientY);
  outlineX(e.clientX);
  outlineY(e.clientY);
});

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


// --- 3. Preloader & Init ---
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  // Split text for headings
  const splitTexts = document.querySelectorAll('.split-text');
  splitTexts.forEach(text => {
    // Basic wrap for staggered lines if SplitType fails or isn't perfect, but SplitType is robust.
    new SplitType(text, { types: 'lines, words, chars' });
  });

  // Preloader Out
  tl.to('.preloader-logo', { opacity: 0, duration: 1, delay: 0.5 })
    .to('.preloader', { yPercent: -100, duration: 1.2, ease: 'power4.inOut' })
    .to('.hero-content', { opacity: 1, duration: 1 }, "-=0.5")
    .from('.hero-content .char', {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power3.out'
    }, "-=1");

  initScrollAnimations();
});


// --- 4. Scroll Animations ---
function initScrollAnimations() {
  
  // Sticky Nav Blur
  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: '.main-nav'}
  });

  // Hero Window Zoom
  // Initially small, then scales to fill viewport
  gsap.to('.hero-window', {
    width: '100vw',
    height: '100vh',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=150%',
      scrub: 1.5,
      pin: true
    }
  });

  // Marquee Parallax
  gsap.to('.marquee-text', {
    xPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.marquee-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Services Pin & Reveal
  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1.5
    }
  });

  servicesTl.to('.service-card', {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    stagger: 0.2,
    ease: 'power2.out'
  });


  // Story Image Crossfade
  const storyTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1
    }
  });

  const images = document.querySelectorAll('.story-img-wrap');
  const captions = document.querySelectorAll('.story-caption');

  // Set initial state
  gsap.set(images[0], { opacity: 1 });
  gsap.set(captions[0], { opacity: 1, y: 0 });

  for (let i = 1; i < images.length; i++) {
    // Fade out previous
    storyTl.to(images[i-1], { opacity: 0, scale: 1.05, duration: 1 }, `step${i}`)
           .to(captions[i-1], { opacity: 0, y: -30, duration: 1 }, `step${i}`);
    
    // Fade in current
    storyTl.to(images[i], { opacity: 1, scale: 1, duration: 1 }, `step${i}`)
           .to(captions[i], { opacity: 1, y: 0, duration: 1 }, `step${i}`);
  }


  // Stats Counter Scrub
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const suffix = stat.getAttribute('data-suffix') || '';
    
    gsap.to(stat, {
      innerHTML: target,
      duration: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          stat.innerHTML = Math.round(self.progress * target) + suffix;
        }
      }
    });
  });


  // Section Headers Reveal
  gsap.utils.toArray('.section-header .char').forEach(char => {
    gsap.from(char, {
      scrollTrigger: {
        trigger: char.closest('.section-header'), // Using closest to avoid triggering early if char is far down
        start: 'top 90%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
}


// --- 5. Magnetic Hover (Testimonials) ---
const magneticCards = document.querySelectorAll('.magnetic');

magneticCards.forEach(card => {
  const xTo = gsap.quickTo(card, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
  const yTo = gsap.quickTo(card, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});
  const rotateTo = gsap.quickTo(card, "rotation", {duration: 1, ease: "elastic.out(1, 0.3)"});

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const xDist = e.clientX - centerX;
    const yDist = e.clientY - centerY;
    
    xTo(xDist * 0.1);
    yTo(yDist * 0.1);
    rotateTo(xDist * 0.05);
  });

  card.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
    rotateTo(0);
  });
});


// --- 6. Particle Canvas Background (Booking CTA) ---
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for(let i=0; i<100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#C9A84C'; // Gold
    
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      
      if(p.x < 0 || p.x > width) p.dx = -p.dx;
      if(p.y < 0 || p.y > height) p.dy = -p.dy;
      
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(drawParticles);
  }

  initCanvas();
  drawParticles();
  window.addEventListener('resize', initCanvas);
}
