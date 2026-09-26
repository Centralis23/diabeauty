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

  const accPanels = document.querySelectorAll('.acc-panel');
  if (accPanels.length) {
    let activeIndex = 0;
    let cycleTimer = null;

    const setActive = (index) => {
      activeIndex = index;
      accPanels.forEach((panel, i) => {
        const isActive = i === index;
        panel.classList.toggle('active', isActive);
        const video = panel.querySelector('.acc-panel-video');
        if (video) {
          if (isActive) video.play().catch(() => {});
          else video.pause();
        }
      });
    };

    const startCycle = () => {
      cycleTimer = setInterval(() => {
        setActive((activeIndex + 1) % accPanels.length);
      }, 3500);
    };
    const stopCycle = () => clearInterval(cycleTimer);

    setActive(0);
    startCycle();

    accPanels.forEach((panel, i) => {
      panel.addEventListener('mouseenter', () => {
        stopCycle();
        setActive(i);
      });
      panel.addEventListener('click', () => {
        stopCycle();
        setActive(i);
      });
    });

    const accordion = document.querySelector('.gallery-accordion');
    if (accordion) {
      accordion.addEventListener('mouseleave', startCycle);
    }
  }

});
