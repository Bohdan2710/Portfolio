gsap.registerPlugin(ScrollTrigger);

const langBtn = document.getElementById('langToggle');
let currentLang = 'en';

const translatableEls = document.querySelectorAll('[data-ua]');
translatableEls.forEach(el => { el.dataset.en = el.innerHTML; });

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ua' : 'en';
  const isUa = currentLang === 'ua';
  translatableEls.forEach(el => { el.innerHTML = isUa ? el.dataset.ua : el.dataset.en; });
  langBtn.textContent = isUa ? 'EN' : 'UA';
  langBtn.classList.toggle('active-ua', isUa);
  document.documentElement.lang = isUa ? 'uk' : 'en';
});

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const burger = document.getElementById('headerBurger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  burger.classList.toggle('open', open);
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
  });
});

function initAmbientParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const spacing = 22;
  const dotSize = 1.0;
  let time = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 1.8;
    const offsetX = (time * 0.25) % spacing;
    const offsetY = (time * 0.25) % spacing;
    ctx.fillStyle = '#ffffff';

    for (let x = -spacing; x <= width + spacing; x += spacing) {
      for (let y = -spacing; y <= height + spacing; y += spacing) {
        const px = x + offsetX;
        const py = y + offsetY;
        const wave1 = Math.sin(px * 0.003 + time * 0.015);
        const wave2 = Math.cos(py * 0.002 - time * 0.012);
        const wave3 = Math.sin((px + py) * 0.0015 + time * 0.01);
        const mix = (wave1 + wave2 + wave3) / 3;
        const opacity = Math.min(Math.max(0, (mix - 0.05) * 1.5), 0.3);
        if (opacity > 0.01) {
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(px, py, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

initAmbientParticles();

const floatingIcons = document.querySelectorAll('.fi');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

  floatingIcons.forEach(icon => {
    const depth = parseFloat(icon.dataset.depth) || 20;
    gsap.to(icon, {
      x: mouseX * depth,
      y: mouseY * depth,
      duration: 1.4,
      ease: 'power2.out'
    });
  });
}, { passive: true });

floatingIcons.forEach((icon, i) => {
  gsap.to(icon, {
    y: `+=${6 + (i % 3) * 4}`,
    rotation: (i % 2 === 0 ? 8 : -8),
    duration: 3 + (i % 4) * 0.7,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: i * 0.3
  });
});

const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .to('.hero-tag',  { opacity: 1, y: 0, duration: 0.7, delay: 0.3 })
  .from('.hero-name', { y: 60, duration: 0.9 }, '-=0.3')
  .to('.hero-name', { opacity: 1, duration: 0.9 }, '<')
  .from('.hero-role', { y: 30, duration: 0.7 }, '-=0.5')
  .to('.hero-role', { opacity: 1, duration: 0.7 }, '<')
  .from('.hero-desc', { y: 20, duration: 0.6 }, '-=0.4')
  .to('.hero-desc', { opacity: 1, duration: 0.6 }, '<')
  .to('.hero-stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
  .from('.hero-stats .stat', { y: 20, stagger: 0.1, duration: 0.5 }, '<')
  .from('.hero-right', { opacity: 0, x: 40, duration: 0.9 }, '-=0.4')
  .from('.hero-contact-card', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '<');

gsap.from('.about-text', {
  scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
  opacity: 0, x: -40, duration: 0.9, ease: 'power3.out'
});
gsap.from('.skills-block', {
  scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
  opacity: 0, x: 40, duration: 0.9, ease: 'power3.out'
});
gsap.from('.skills-tags span', {
  scrollTrigger: { trigger: '.skills-block', start: 'top 85%' },
  opacity: 0, y: 15, stagger: 0.04, duration: 0.4, ease: 'power2.out'
});

gsap.utils.toArray('.section-header').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
  });
});

gsap.utils.toArray('.auto-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%' },
    opacity: 0, y: 50, duration: 0.8, delay: (i % 2) * 0.12, ease: 'power3.out'
  });
});

gsap.utils.toArray('.auto-card').forEach(card => {
  gsap.from(card.querySelectorAll('.p-step, .p-arrow'), {
    scrollTrigger: { trigger: card, start: 'top 85%' },
    opacity: 0, x: -15, stagger: 0.08, duration: 0.5, ease: 'power2.out'
  });
});

gsap.utils.toArray('.auto-card-metrics').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%' },
    opacity: 0, y: 20, duration: 0.6, ease: 'power2.out'
  });
});

const cardGrid = document.querySelector('.portfolio-grid');
if (cardGrid) {
  gsap.from('.portfolio-grid .card', {
    scrollTrigger: { trigger: cardGrid, start: 'top 85%' },
    opacity: 0, y: 50, stagger: 0.08, duration: 0.7, ease: 'power3.out'
  });
}

document.querySelectorAll('.auto-card-visual[data-images]').forEach(visual => {
  const images = (visual.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
  if (images.length < 2) return;
  const card = visual.closest('.auto-card');
  let current = 0;

  const imgWrap = document.createElement('div');
  imgWrap.className = 'auto-slide-wrap';
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'auto-slide-img' + (i === 0 ? ' active' : '');
    img.alt = '';
    imgWrap.appendChild(img);
  });
  visual.insertBefore(imgWrap, visual.firstChild);

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'auto-slide-dots';
  images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'auto-slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', e => { e.stopPropagation(); goTo(i); });
    dotsWrap.appendChild(dot);
  });
  visual.appendChild(dotsWrap);

  let userPaused = false;

  function goTo(index, pause) {
    imgWrap.querySelectorAll('.auto-slide-img')[current].classList.remove('active');
    dotsWrap.querySelectorAll('.auto-slide-dot')[current].classList.remove('active');
    current = index;
    imgWrap.querySelectorAll('.auto-slide-img')[current].classList.add('active');
    dotsWrap.querySelectorAll('.auto-slide-dot')[current].classList.add('active');
    if (pause) { userPaused = true; clearInterval(interval); interval = null; }
  }

  const prevBtn = document.createElement('button');
  prevBtn.className = 'auto-slide-prev';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '&#8249;';
  prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo((current - 1 + images.length) % images.length, true); });
  visual.appendChild(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'auto-slide-next';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '&#8250;';
  nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo((current + 1) % images.length, true); });
  visual.appendChild(nextBtn);

  const expandBtn = document.createElement('button');
  expandBtn.className = 'auto-slide-expand';
  expandBtn.setAttribute('aria-label', 'Fullscreen');
  expandBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
  expandBtn.addEventListener('click', e => { e.stopPropagation(); openLightbox(images, current); });
  visual.appendChild(expandBtn);

  let interval = null;
  card.addEventListener('mouseenter', () => {
    if (!userPaused) { interval = setInterval(() => goTo((current + 1) % images.length), 2800); }
  });
  card.addEventListener('mouseleave', () => { clearInterval(interval); interval = null; userPaused = false; });
});

(function () {
  const lb = document.createElement('div');
  lb.className = 'lb-overlay';
  lb.innerHTML = `
    <div class="lb-inner">
      <img class="lb-img" src="" alt="">
      <button class="lb-prev">&#8249;</button>
      <button class="lb-next">&#8250;</button>
      <button class="lb-close">&#x2715;</button>
      <div class="lb-dots"></div>
    </div>`;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('.lb-img');
  const lbDots = lb.querySelector('.lb-dots');
  let lbImages = [], lbCurrent = 0;

  function lbGoTo(i) {
    lbCurrent = (i + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbCurrent];
    lbDots.querySelectorAll('.lb-dot').forEach((d, idx) => d.classList.toggle('active', idx === lbCurrent));
  }

  window.openLightbox = function (imgs, start) {
    lbImages = imgs;
    lbDots.innerHTML = imgs.map((_, i) => `<div class="lb-dot${i === start ? ' active' : ''}"></div>`).join('');
    lbDots.querySelectorAll('.lb-dot').forEach((d, i) => d.addEventListener('click', () => lbGoTo(i)));
    lbImg.src = imgs[start];
    lbCurrent = start;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  lb.querySelector('.lb-close').addEventListener('click', () => { lb.classList.remove('open'); document.body.style.overflow = ''; });
  lb.querySelector('.lb-prev').addEventListener('click', () => lbGoTo(lbCurrent - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => lbGoTo(lbCurrent + 1));
  lb.addEventListener('click', e => { if (e.target === lb) { lb.classList.remove('open'); document.body.style.overflow = ''; } });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') lbGoTo(lbCurrent - 1);
    if (e.key === 'ArrowRight') lbGoTo(lbCurrent + 1);
    if (e.key === 'Escape') { lb.classList.remove('open'); document.body.style.overflow = ''; }
  });
}());

document.querySelectorAll('.card-slider').forEach(slider => {
  const images = (slider.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
  if (images.length < 2) return;
  const card = slider.closest('.card');
  let current = 0;

  slider.innerHTML = '';
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'card-bg-image' + (i === 0 ? ' active-slide' : '');
    img.alt = '';
    slider.appendChild(img);
  });

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'slider-dots';
  images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', e => { e.preventDefault(); goTo(i); });
    dotsWrap.appendChild(dot);
  });
  card.appendChild(dotsWrap);

  function goTo(index) {
    const imgs = slider.querySelectorAll('.card-bg-image');
    const dots = dotsWrap.querySelectorAll('.slider-dot');
    imgs[current].classList.remove('active-slide');
    dots[current].classList.remove('active');
    current = index;
    imgs[current].classList.add('active-slide');
    dots[current].classList.add('active');
  }

  let interval = null;
  card.addEventListener('mouseenter', () => { interval = setInterval(() => goTo((current + 1) % images.length), 3000); });
  card.addEventListener('mouseleave', () => { clearInterval(interval); interval = null; });
});
