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

  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    let autoTimer = null;
    let resumeTimer = null;
    let animRAF = null;

    const animateTo = (target, duration) => {
      if (animRAF) cancelAnimationFrame(animRAF);
      const start = servicesGrid.scrollLeft;
      const change = target - start;
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        servicesGrid.scrollLeft = start + change * ease;
        if (progress < 1) animRAF = requestAnimationFrame(tick);
      };
      animRAF = requestAnimationFrame(tick);
    };

    const step = () => {
      const card = servicesGrid.querySelector('.service-card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(servicesGrid).columnGap || '0');
      const cardStep = card.getBoundingClientRect().width + gap;
      const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
      const target = servicesGrid.scrollLeft + cardStep >= maxScroll - 2
        ? 0
        : servicesGrid.scrollLeft + cardStep;
      animateTo(target, 700);
    };

    const startAuto = () => { autoTimer = setInterval(step, 3200); };
    const stopAuto = () => {
      clearInterval(autoTimer);
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(startAuto, 5000);
    };

    startAuto();
    servicesGrid.addEventListener('touchstart', stopAuto, { passive: true });
    servicesGrid.addEventListener('mousedown', stopAuto);
    servicesGrid.addEventListener('wheel', stopAuto, { passive: true });
  }

  const welcomeReveals = document.querySelectorAll('.welcome-arch-panel, .services-tags-card');
  if (welcomeReveals.length && 'IntersectionObserver' in window) {
    const welcomeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('welcome-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    welcomeReveals.forEach((el) => welcomeObserver.observe(el));
  } else {
    welcomeReveals.forEach((el) => el.classList.add('welcome-reveal'));
  }

  const whyCards = document.querySelectorAll('.why-card, .why-heading');
  if (whyCards.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('why-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    whyCards.forEach((card) => revealObserver.observe(card));
  } else {
    whyCards.forEach((card) => card.classList.add('why-reveal'));
  }

});
