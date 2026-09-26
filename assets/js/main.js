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

    const step = () => {
      const card = servicesGrid.querySelector('.service-card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(servicesGrid).columnGap || '0');
      const cardStep = card.getBoundingClientRect().width + gap;
      const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
      if (servicesGrid.scrollLeft + cardStep >= maxScroll - 2) {
        servicesGrid.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        servicesGrid.scrollBy({ left: cardStep, behavior: 'smooth' });
      }
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
