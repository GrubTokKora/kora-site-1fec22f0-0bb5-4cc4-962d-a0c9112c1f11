window.KORA_SITE_CONFIG = {
  apiBaseUrl: 'https://kora-agent.grubtok.com',
  businessId: '1fec22f0-0bb5-4cc4-962d-a0c9112c1f11',
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

function setSubmittingState(form, isSubmitting, busyLabel) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  if (isSubmitting) {
    submitBtn.dataset.originalText = submitBtn.textContent || 'Submit';
    submitBtn.textContent = busyLabel || 'Sending...';
    submitBtn.disabled = true;
    return;
  }
  submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
  submitBtn.disabled = false;
}

function parseApiError(data, fallback) {
  const detail = data && data.detail;
  if (typeof detail === 'string' && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const joined = detail.map((d) => d.msg || d.message || '').filter(Boolean).join(' ');
    if (joined) return joined;
  }
  if (data && typeof data.message === 'string' && data.message.trim()) return data.message;
  return fallback;
}

let recaptchaScriptPromise = null;
const RECAPTCHA_W = 304;
const RECAPTCHA_H = 78;
const responsiveRecaptchaBoxes = [];

function scaleRecaptcha(box) {
  const wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains('g-recaptcha-scale')) return;
  const available = wrap.clientWidth;
  if (!available) return;
  const scale = Math.min(1, available / RECAPTCHA_W);
  box.style.transform = scale < 1 ? `scale(${scale.toFixed(4)})` : 'none';
  wrap.style.height = `${Math.ceil(RECAPTCHA_H * scale)}px`;
}

function makeRecaptchaResponsive(box) {
  if (!box || box.dataset.koraRecaptchaResponsive === 'true') return;
  box.dataset.koraRecaptchaResponsive = 'true';

  let wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains('g-recaptcha-scale')) {
    wrap = document.createElement('div');
    wrap.className = 'g-recaptcha-scale';
    box.parentNode.insertBefore(wrap, box);
    wrap.appendChild(box);
  }

  scaleRecaptcha(box);
  const observer = new MutationObserver(() => scaleRecaptcha(box));
  observer.observe(box, { childList: true, subtree: true });
  responsiveRecaptchaBoxes.push(box);
}

let recaptchaResizeTimer = null;
window.addEventListener('resize', () => {
  window.clearTimeout(recaptchaResizeTimer);
  recaptchaResizeTimer = window.setTimeout(() => {
    responsiveRecaptchaBoxes.forEach(scaleRecaptcha);
  }, 150);
});

function ensureRecaptchaScript(siteKey) {
  if (!siteKey) return Promise.resolve();
  if (typeof window.grecaptcha !== 'undefined') return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;
  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-kora-recaptcha="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('reCAPTCHA failed to load')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.dataset.koraRecaptcha = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'));
    document.head.appendChild(script);
  });
  return recaptchaScriptPromise;
}

function getRecaptchaToken(form) {
  if (typeof window.grecaptcha === 'undefined') return '';
  const recaptchaEl = form.querySelector('.g-recaptcha');
  if (!recaptchaEl) return '';
  return window.grecaptcha.getResponse() || '';
}

function resetRecaptcha(form) {
  if (typeof window.grecaptcha === 'undefined') return;
  if (form.querySelector('.g-recaptcha')) window.grecaptcha.reset();
}

/**
 * Kora public newsletter API — POST {apiBaseUrl}/api/v1/public/newsletter/subscribe
 * Mirrors kora-agent app/api/v1/public_newsletter.py
 */
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
        setFormStatus(form, 'Newsletter is not configured for this site.', 'error');
        return;
      }

      setSubmittingState(form, true, 'Subscribing...');
      setFormStatus(form, 'Subscribing...', 'neutral');

      try {
        const response = await fetch(`${apiBaseUrl}/api/v1/public/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            business_id: businessId,
            email,
            phone_number: null,
            email_opt_in: true,
            sms_opt_in: false,
            metadata: {
              page_path: window.location.pathname,
              referrer: document.referrer || '',
            },
            source: 'static_website_widget',
          }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(parseApiError(data, 'Could not subscribe right now. Please try again.'));
        }
        form.reset();
        setFormStatus(form, data.message || 'Thank you for subscribing!', 'success');
      } catch (error) {
        setFormStatus(form, error.message || 'Could not subscribe right now. Please try again.', 'error');
      } finally {
        setSubmittingState(form, false);
      }
    });
  });
}

/**
 * Kora public forms API — POST {apiBaseUrl}/api/v1/public/forms/submit
 * Mirrors kora-agent app/api/v1/public_forms.py (requires reCAPTCHA v2 token)
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  const config = window.KORA_SITE_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || '').replace(/\/+$/, '');
  const businessId = config.businessId || '';
  const recaptchaSiteKey = (config.recaptchaSiteKey || '').trim();
  const recaptchaEl = form.querySelector('.g-recaptcha');

  if (recaptchaEl && recaptchaSiteKey) {
    recaptchaEl.setAttribute('data-sitekey', recaptchaSiteKey);
    makeRecaptchaResponsive(recaptchaEl);
    form.addEventListener('focusin', () => {
      ensureRecaptchaScript(recaptchaSiteKey).catch(() => {
        setFormStatus(form, 'Security check failed to load. Please refresh and try again.', 'error');
      });
    }, { once: true });
  } else if (recaptchaEl && !recaptchaSiteKey) {
    recaptchaEl.style.display = 'none';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = ((form.querySelector('[name="name"]') || {}).value || '').trim();
    const email = ((form.querySelector('[name="email"]') || {}).value || '').trim();
    const message = ((form.querySelector('[name="message"]') || {}).value || '').trim();

    if (!name || !email || !message) {
      setFormStatus(form, 'Please fill in your name, email, and message.', 'error');
      return;
    }

    if (!businessId || !apiBaseUrl) {
      setFormStatus(form, 'Form submission is not configured for this site.', 'error');
      return;
    }

    if (recaptchaEl && !recaptchaSiteKey) {
      setFormStatus(form, 'Form temporarily unavailable.', 'error');
      return;
    }

    if (recaptchaEl && recaptchaSiteKey) {
      try {
        await ensureRecaptchaScript(recaptchaSiteKey);
      } catch {
        setFormStatus(form, 'Security check failed to load. Please refresh and try again.', 'error');
        return;
      }
      const captchaToken = getRecaptchaToken(form);
      if (!captchaToken) {
        setFormStatus(form, 'Please complete the security check.', 'error');
        return;
      }
    }

    const captchaToken = getRecaptchaToken(form);
    setSubmittingState(form, true, 'Sending...');
    setFormStatus(form, 'Sending...', 'neutral');

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/public/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          form_type: 'contact',
          form_data: {
            name,
            email,
            message,
          },
          submitter_email: email,
          captcha_token: captchaToken || '',
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(parseApiError(data, 'Something went wrong. Please try again.'));
      }
      form.reset();
      resetRecaptcha(form);
      setFormStatus(form, data.message || 'Thank you! Your message has been received.', 'success');
    } catch (error) {
      resetRecaptcha(form);
      setFormStatus(form, error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
      setSubmittingState(form, false);
    }
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

/**
 * Product inquire dialog on shop page.
 * Prefills message with product name / category / price (no product id).
 * Submits via Kora public forms API as form_type: product_inquiry.
 */
function initProductInquire() {
  const root = document.getElementById('inquire-dialog');
  const form = document.getElementById('inquire-form');
  if (!root || !form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  const triggers = document.querySelectorAll('[data-inquire]');
  if (!triggers.length) return;

  const panel = root.querySelector('.inquire-dialog__panel');
  const dismissEls = root.querySelectorAll('[data-inquire-dismiss]');
  const summaryEl = root.querySelector('[data-inquire-summary]');
  const notesField = form.querySelector('[name="message"]');

  const config = window.KORA_SITE_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || '').replace(/\/+$/, '');
  const businessId = config.businessId || '';
  const recaptchaSiteKey = (config.recaptchaSiteKey || '').trim();
  const recaptchaEl = form.querySelector('.g-recaptcha');

  let lastFocus = null;
  let activeProduct = { name: '', category: '', price: '' };

  if (recaptchaEl && recaptchaSiteKey) {
    recaptchaEl.setAttribute('data-sitekey', recaptchaSiteKey);
    makeRecaptchaResponsive(recaptchaEl);
  } else if (recaptchaEl && !recaptchaSiteKey) {
    recaptchaEl.style.display = 'none';
  }

  const buildInquirySummary = (product) => {
    const lines = [`I'm interested in purchasing:`, '', `Product: ${product.name || 'Product'}`];
    if (product.category) lines.push(`Brand / category: ${product.category}`);
    if (product.price) lines.push(`Price: ${product.price}`);
    return lines.join('\n');
  };

  const open = (trigger) => {
    activeProduct = {
      name: (trigger.getAttribute('data-product-name') || '').trim(),
      category: (trigger.getAttribute('data-product-category') || '').trim(),
      price: (trigger.getAttribute('data-product-price') || '').trim(),
    };

    if (summaryEl) summaryEl.textContent = buildInquirySummary(activeProduct);
    if (notesField) notesField.value = '';

    setFormStatus(form, '', '');
    lastFocus = document.activeElement;
    root.hidden = false;
    document.documentElement.classList.add('has-inquire-dialog');
    document.body.classList.add('has-inquire-dialog');
    requestAnimationFrame(() => {
      root.classList.add('is-open');
      const firstField = form.querySelector('[name="name"]');
      if (firstField) firstField.focus();
    });

    if (recaptchaEl && recaptchaSiteKey) {
      ensureRecaptchaScript(recaptchaSiteKey).catch(() => {
        setFormStatus(form, 'Security check failed to load. Please refresh and try again.', 'error');
      });
    }
  };

  const close = () => {
    root.classList.remove('is-open');
    document.documentElement.classList.remove('has-inquire-dialog');
    document.body.classList.remove('has-inquire-dialog');
    window.setTimeout(() => {
      root.hidden = true;
      form.reset();
      resetRecaptcha(form);
      setFormStatus(form, '', '');
      activeProduct = { name: '', category: '', price: '' };
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }, 300);
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => open(btn));
  });

  dismissEls.forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) close();
  });

  if (panel) {
    panel.addEventListener('click', (e) => e.stopPropagation());
  }

  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const target = e.target;
    if (!target || target.tagName !== 'INPUT') return;

    e.preventDefault();
    const fields = Array.from(
      form.querySelectorAll('input:not([type="hidden"]):not([disabled]), button[type="submit"]:not([disabled])')
    );
    const index = fields.indexOf(target);
    if (index === -1) return;
    const next = fields[index + 1];
    if (next) {
      next.focus();
      return;
    }
    form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = ((form.querySelector('[name="name"]') || {}).value || '').trim();
    const email = ((form.querySelector('[name="email"]') || {}).value || '').trim();
    const phone = ((form.querySelector('[name="phone"]') || {}).value || '').trim();
    const message = ((form.querySelector('[name="message"]') || {}).value || '').trim();

    if (!name || !email || !phone) {
      setFormStatus(form, 'Please fill in your name, email, and phone.', 'error');
      return;
    }

    if (!businessId || !apiBaseUrl) {
      setFormStatus(form, 'Form submission is not configured for this site.', 'error');
      return;
    }

    if (recaptchaEl && !recaptchaSiteKey) {
      setFormStatus(form, 'Form temporarily unavailable.', 'error');
      return;
    }

    if (recaptchaEl && recaptchaSiteKey) {
      try {
        await ensureRecaptchaScript(recaptchaSiteKey);
      } catch {
        setFormStatus(form, 'Security check failed to load. Please refresh and try again.', 'error');
        return;
      }
      if (!getRecaptchaToken(form)) {
        setFormStatus(form, 'Please complete the security check.', 'error');
        return;
      }
    }

    const captchaToken = getRecaptchaToken(form);
    const productName = activeProduct.name || '';
    const productCategory = activeProduct.category || '';
    const productPrice = activeProduct.price || '';
    const inquirySummary = buildInquirySummary(activeProduct);
    const fullMessage = message
      ? `${inquirySummary}\n\nAdditional message:\n${message}`
      : inquirySummary;

    setSubmittingState(form, true, 'Sending...');
    setFormStatus(form, 'Sending...', 'neutral');

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/public/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          form_type: 'product_inquiry',
          form_data: {
            name,
            email,
            phone,
            message: fullMessage,
            product_name: productName,
            product_category: productCategory,
            product_price: productPrice,
          },
          submitter_email: email,
          captcha_token: captchaToken || '',
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(parseApiError(data, 'Something went wrong. Please try again.'));
      }
      form.reset();
      resetRecaptcha(form);
      setFormStatus(form, data.message || 'Thank you! We received your inquiry.', 'success');
      window.setTimeout(close, 1600);
    } catch (error) {
      resetRecaptcha(form);
      setFormStatus(form, error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
      setSubmittingState(form, false);
    }
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
  initProductInquire();
  initScrollAnimations();
  initSmoothScroll();
  initReviewsCarousel();
  initLightbox();
  initOnPartialsLoaded();
});
