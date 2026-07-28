window.KORA_SITE_CONFIG = {
  apiBaseUrl: 'https://kora-agent.grubtok.com',
  businessId: 'f0928a0a-5954-43eb-abd4-20850db1cce4',
  recaptchaSiteKey: '6LcsdJYsAAAAAAur-h7cYlZuGJTmijNHmOi5kFH7',
};

const COOKIE_KEY = 'veda_cookie_consent';
const GIFT_BAR_KEY = 'veda_gift_bar_dismissed';

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');

  if (!menu || !menuBtn) return;

  function openMenu() {
    menu.classList.add('active');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('active');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
  });
}

function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header || header.dataset.scrollBound === 'true') return;

  header.dataset.scrollBound = 'true';

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  if (!banner || !acceptBtn) return;

  if (localStorage.getItem(COOKIE_KEY) === 'accepted') {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.hidden = true;
  });
}

function initGiftPopup() {
  const popup = document.getElementById('gift-popup');
  if (!popup || popup.dataset.bound === 'true') return;
  popup.dataset.bound = 'true';

  const dialog = popup.querySelector('.gift-popup__dialog');
  const dismissEls = popup.querySelectorAll('[data-gift-dismiss]');

  const closePopup = () => {
    popup.classList.remove('is-open');
    document.body.classList.remove('has-gift-popup');
    window.setTimeout(() => {
      popup.hidden = true;
    }, 320);
    localStorage.setItem(GIFT_BAR_KEY, 'dismissed');
  };

  if (localStorage.getItem(GIFT_BAR_KEY) === 'dismissed') {
    popup.hidden = true;
    return;
  }

  const openPopup = () => {
    popup.hidden = false;
    document.body.classList.add('has-gift-popup');
    requestAnimationFrame(() => {
      popup.classList.add('is-open');
      const closeBtn = popup.querySelector('.gift-popup__close');
      if (closeBtn) closeBtn.focus();
    });
  };

  dismissEls.forEach((el) => {
    el.addEventListener('click', closePopup);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
  });

  if (dialog) {
    dialog.addEventListener('click', (e) => e.stopPropagation());
  }

  window.setTimeout(openPopup, 900);
}

function setFormStatus(form, text, kind) {
  const statusEl = form.querySelector('.form-status');
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.classList.toggle('is-visible', Boolean(text));
  statusEl.classList.remove('form-status--error', 'form-status--success', 'form-status--neutral');
  if (kind === 'error') statusEl.classList.add('form-status--error');
  else if (kind === 'success') statusEl.classList.add('form-status--success');
  else if (kind) statusEl.classList.add('form-status--neutral');
}

function initNewsletterForms() {
  const config = window.KORA_SITE_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || '').replace(/\/+$/, '');
  const businessId = config.businessId || '';

  document.querySelectorAll('form[data-form-type="newsletter"]').forEach((form) => {
    if (form.dataset.bound) return;
    form.dataset.bound = 'true';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const emailInput = form.querySelector('[name="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email) {
        setFormStatus(form, 'Please enter your email address.', 'error');
        return;
      }

      if (!businessId || !apiBaseUrl) {
        form.reset();
        setFormStatus(form, 'Thank you for subscribing!', 'success');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      setFormStatus(form, 'Subscribing...', 'neutral');

      try {
        const response = await fetch(`${apiBaseUrl}/api/v1/public/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            business_id: businessId,
            email,
            phone_number: null,
            email_opt_in: true,
            sms_opt_in: false,
            metadata: { page_path: window.location.pathname },
            source: 'static_website_widget',
          }),
        });
        if (!response.ok) throw new Error('subscribe failed');
        form.reset();
        setFormStatus(form, 'Thank you for subscribing!', 'success');
      } catch {
        setFormStatus(form, 'Could not subscribe right now. Please try again.', 'error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = (form.querySelector('[name="name"]') || {}).value || '';
    const email = (form.querySelector('[name="email"]') || {}).value || '';
    const message = (form.querySelector('[name="message"]') || {}).value || '';
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus(form, 'Please fill in your name, email, and message.', 'error');
      return;
    }
    const subject = encodeURIComponent('Message from Veda Healing Spa website');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:vedahealingspa@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus(form, 'Thank you! Your email client should open to send your message.', 'success');
    form.reset();
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-up');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex);
      const hash = href.slice(hashIndex);
      if (!hash || hash === '#') return;

      const onHome =
        !path ||
        path === 'index.html' ||
        path === './index.html' ||
        path === '/' ||
        path.endsWith('/index.html');
      const isHomePage =
        document.body.dataset.page === 'home' ||
        /(?:^|\/)(?:index\.html)?$/.test(window.location.pathname);

      if (path && !(onHome && isHomePage)) return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', hash);
    });
  });
}

function initReviewsCarousel() {
  const root = document.querySelector('[data-reviews-carousel]');
  if (!root || root.dataset.bound) return;
  root.dataset.bound = 'true';

  const track = root.querySelector('[data-carousel-track]');
  const viewport = root.querySelector('.reviews-carousel__viewport');
  const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const dotsWrap = root.querySelector('[data-carousel-dots]');
  if (!track || !viewport || slides.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let autoplayId = null;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let isDragging = false;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'reviews-carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.reviews-carousel__dot'));

  function update() {
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    if (reduceMotion || slides.length < 2) return;
    stopAutoplay();
    autoplayId = setInterval(next, 5500);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  });

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    track.classList.add('is-dragging');
    stopAutoplay();
    viewport.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    const width = viewport.offsetWidth || 1;
    const percent = (dragDeltaX / width) * 100;
    track.style.transform = `translate3d(${-index * 100 + percent}%, 0, 0)`;
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    const threshold = Math.min(80, (viewport.offsetWidth || 300) * 0.18);
    if (dragDeltaX <= -threshold) next();
    else if (dragDeltaX >= threshold) prev();
    else update();
    restartAutoplay();
    try { viewport.releasePointerCapture?.(e.pointerId); } catch (_) { /* ignore */ }
  }

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', onPointerUp);
  viewport.addEventListener('pointerleave', () => {
    if (isDragging) {
      isDragging = false;
      track.classList.remove('is-dragging');
      update();
      restartAutoplay();
    }
  });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  update();
  startAutoplay();
}

function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (!triggers.length || document.getElementById('site-lightbox')) return;

  const root = document.createElement('div');
  root.id = 'site-lightbox';
  root.className = 'lightbox';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Image gallery');
  root.hidden = true;
  root.innerHTML = `
    <div class="lightbox__blur" data-lightbox-blur aria-hidden="true"></div>
    <div class="lightbox__stage">
      <img class="lightbox__image" data-lightbox-image alt="">
    </div>
    <div class="lightbox__counter" data-lightbox-counter aria-live="polite"></div>
    <button type="button" class="lightbox__close" data-lightbox-close aria-label="Close gallery">&times;</button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="Previous image">
      <span class="lightbox__nav-icon" aria-hidden="true"></span>
    </button>
    <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="Next image">
      <span class="lightbox__nav-icon" aria-hidden="true"></span>
    </button>
  `;
  document.body.appendChild(root);

  const blurEl = root.querySelector('[data-lightbox-blur]');
  const imageEl = root.querySelector('[data-lightbox-image]');
  const counterEl = root.querySelector('[data-lightbox-counter]');
  const closeBtns = root.querySelectorAll('[data-lightbox-close]');
  const prevBtn = root.querySelector('[data-lightbox-prev]');
  const nextBtn = root.querySelector('[data-lightbox-next]');

  let items = [];
  let index = 0;
  let lastFocus = null;

  const getSrc = (el) => {
    const img = el.matches('img') ? el : el.querySelector('img');
    return el.getAttribute('data-lightbox-src') || (img && img.currentSrc) || (img && img.src) || '';
  };

  const getAlt = (el) => {
    const img = el.matches('img') ? el : el.querySelector('img');
    return el.getAttribute('data-lightbox-alt') || (img && img.alt) || '';
  };

  const collectGroup = (trigger) => {
    const gallery = trigger.closest('[data-lightbox-gallery]');
    if (gallery) {
      return Array.from(gallery.querySelectorAll('[data-lightbox]'));
    }
    return [trigger];
  };

  const render = () => {
    const item = items[index];
    if (!item) return;

    const src = getSrc(item);
    const alt = getAlt(item);
    const total = items.length;

    root.classList.toggle('is-single', total < 2);
    counterEl.textContent = `${index + 1} / ${total}`;
    blurEl.style.backgroundImage = src ? `url("${src}")` : '';

    imageEl.classList.remove('is-ready');
    imageEl.alt = alt;

    const absolute = new URL(src, window.location.href).href;
    if (imageEl.src !== absolute) {
      imageEl.src = src;
    } else {
      imageEl.classList.add('is-ready');
    }
  };

  imageEl.addEventListener('load', () => {
    imageEl.classList.add('is-ready');
  });

  const open = (trigger) => {
    items = collectGroup(trigger);
    index = Math.max(0, items.indexOf(trigger));
    lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('is-open'));
    document.body.classList.add('lightbox-open');
    render();
    root.querySelector('[data-lightbox-close]').focus();
  };

  const close = () => {
    root.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    window.setTimeout(() => {
      if (!root.classList.contains('is-open')) {
        root.hidden = true;
        imageEl.removeAttribute('src');
        imageEl.classList.remove('is-ready');
        blurEl.style.backgroundImage = '';
      }
    }, 300);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  const showNext = (delta) => {
    if (items.length < 2) return;
    index = (index + delta + items.length) % items.length;
    render();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  closeBtns.forEach((btn) => btn.addEventListener('click', close));
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  root.addEventListener('click', (e) => {
    if (e.target === root || e.target.classList.contains('lightbox__stage')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!root.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

function initOnPartialsLoaded() {
  initMobileMenu();
  initNavbarScroll();
  initNewsletterForms();
  initGiftPopup();
}

document.addEventListener('site:partials-loaded', initOnPartialsLoaded);

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initContactForm();
  initScrollAnimations();
  initSmoothScroll();
  initReviewsCarousel();
  initLightbox();
  initOnPartialsLoaded();
});
