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

  const galleryTabs = document.querySelectorAll('.gallery-nav-tab');
  const thumbs = document.querySelectorAll('.thumb');
  const spotlight = document.getElementById('spotlight');
  const spotlightImg = document.getElementById('spotlight-img');
  const spotlightTitle = document.getElementById('spotlight-title');
  const spotlightPlay = document.getElementById('spotlight-play');

  let currentThumb = null;

  const setSpotlight = (thumb) => {
    if (!thumb || thumb === currentThumb) return;
    thumbs.forEach((t) => t.classList.remove('active'));
    thumb.classList.add('active');
    currentThumb = thumb;

    spotlight.classList.add('is-fading');
    setTimeout(() => {
      spotlightImg.src = thumb.dataset.img;
      spotlightImg.alt = thumb.dataset.title;
      spotlightTitle.textContent = thumb.dataset.title;
      spotlightPlay.hidden = thumb.dataset.lightbox !== 'video';
      spotlight.dataset.lightbox = thumb.dataset.lightbox;
      spotlight.dataset.videoSrc = thumb.dataset.videoSrc || '';
      spotlight.classList.remove('is-fading');
    }, 250);
  };

  if (thumbs.length && spotlight) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => setSpotlight(thumb));
    });
    setSpotlight(thumbs[0]);
  }

  if (galleryTabs.length && thumbs.length) {
    galleryTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        galleryTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        let firstVisible = null;
        thumbs.forEach((thumb) => {
          const show = filter === 'all' || thumb.dataset.category === filter;
          thumb.classList.toggle('is-hidden', !show);
          if (show && !firstVisible) firstVisible = thumb;
        });
        if (firstVisible) setSpotlight(firstVisible);
      });
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.getElementById('lightbox-close');

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxContent.innerHTML = '';
  };

  const openLightbox = (type, videoSrc, imgEl) => {
    lightboxContent.innerHTML = '';
    if (type === 'video') {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      lightboxContent.appendChild(video);
    } else if (imgEl) {
      const full = document.createElement('img');
      full.src = imgEl.src;
      full.alt = imgEl.alt;
      lightboxContent.appendChild(full);
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  if (lightbox && lightboxContent && spotlight) {
    spotlight.addEventListener('click', () => {
      openLightbox(spotlight.dataset.lightbox, spotlight.dataset.videoSrc, spotlightImg);
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

});
