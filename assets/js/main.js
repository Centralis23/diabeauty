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

  const hotspots = document.querySelectorAll('.hotspot');
  const hotspotItems = document.querySelectorAll('.hotspot-item');
  const setActiveHotspot = (id) => {
    hotspots.forEach((el) => el.classList.toggle('active', el.dataset.hotspot === id));
    hotspotItems.forEach((el) => el.classList.toggle('active', el.dataset.hotspot === id));
  };
  hotspots.forEach((el) => {
    el.addEventListener('mouseenter', () => setActiveHotspot(el.dataset.hotspot));
    el.addEventListener('click', () => setActiveHotspot(el.dataset.hotspot));
  });
  hotspotItems.forEach((el) => {
    el.addEventListener('mouseenter', () => setActiveHotspot(el.dataset.hotspot));
    el.addEventListener('click', () => setActiveHotspot(el.dataset.hotspot));
  });
});
