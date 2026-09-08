document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const fullText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing');
    let i = 0;
    const typeNext = () => {
      i += 1;
      heroTitle.textContent = fullText.slice(0, i);
      if (i < fullText.length) {
        setTimeout(typeNext, 110);
      } else {
        heroTitle.classList.remove('typing');
      }
    };
    setTimeout(typeNext, 300);
  }

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
});
