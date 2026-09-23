document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      formNote.hidden = false;
      setTimeout(() => { formNote.hidden = true; }, 6000);
    });
  }

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      accordionHeaders.forEach((other) => other.setAttribute('aria-expanded', 'false'));
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  const archTrack = document.getElementById('arch-feature-track');
  if (archTrack) {
    const archItems = Array.from(archTrack.querySelectorAll('.arch-feature-item'));
    let archCurrent = 0;
    const isCompact = () => window.matchMedia('(max-width: 860px)').matches;

    const updateArchFeature = () => {
      const itemWidth = archItems[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(archTrack).gap) || 0;
      const step = itemWidth + gap;
      archTrack.style.transform = `translateX(${-archCurrent * step}px)`;

      const compact = isCompact();
      const rotateStep = compact ? -26 : -42;
      const depthStep = compact ? -70 : -180;
      const scaleStep = compact ? 0.15 : 0.24;

      archItems.forEach((el, i) => {
        const diff = i - archCurrent;
        const clamped = Math.max(-2, Math.min(2, diff));
        const rotate = clamped * rotateStep;
        const depth = Math.abs(clamped) * depthStep;
        const scale = 1 - Math.abs(clamped) * scaleStep;
        const opacity = clamped === 0 ? 1 : Math.max(0.4, 1 - Math.abs(clamped) * 0.28);
        el.style.transform = `rotateY(${rotate}deg) translateZ(${depth}px) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.classList.toggle('is-active', diff === 0);
      });
    };

    updateArchFeature();
    window.addEventListener('resize', updateArchFeature);

    setInterval(() => {
      archCurrent = (archCurrent + 1) % archItems.length;
      updateArchFeature();
    }, 3200);
  }

});
