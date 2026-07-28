const ICON_MENU = '<svg class="icon icon-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>';
const ICON_CLOSE = '<svg class="icon icon-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>';
const ICON_FACEBOOK = '<svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>';
const ICON_INSTAGRAM = '<svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
const ICON_PHONE = '<svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>';

const BOOK_URL = 'https://vedahealingspa.glossgenius.com/services';
const GIFT_URL = 'https://squareup.com/gift/MLMJ25NP8QPZN/order';

const HEADER_HTML = `
<header class="site-header">
  <div class="top-bar bg-brand-primary text-brand-dark py-2 px-4 hidden md:block">
    <div class="max-w-7xl mx-auto flex items-center justify-between text-sm">
      <a href="tel:+12032977000" class="inline-flex items-center gap-2 font-medium hover:text-brand-accent transition-colors">
        ${ICON_PHONE}
        203-297-7000
      </a>
      <div class="flex items-center gap-4">
        <a href="https://www.facebook.com/105008240868072" target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent transition-colors" aria-label="Facebook">${ICON_FACEBOOK}</a>
        <a href="https://www.instagram.com/vedahealingspa/" target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent transition-colors" aria-label="Instagram">${ICON_INSTAGRAM}</a>
      </div>
    </div>
  </div>

  <nav id="navbar" class="navbar bg-white border-b border-[#9a9073]/30" aria-label="Main navigation">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="navbar-inner flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-3 group" aria-label="Veda Healing Spa Home">
          <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/1fec22f0-0bb5-4cc4-962d-a0c9112c1f11/de8c94d8-887e-4625-825f-ec262dbc28df/1785242213_6czo1c.png" alt="Veda Healing Spa" class="header-logo" width="185" height="170" loading="eager" decoding="async">
        </a>

        <div class="hidden lg:flex items-center gap-1">
          <a href="index.html" data-nav="home" class="nav-link px-3.5 py-2 text-base font-medium uppercase tracking-wide text-brand-dark hover:text-brand-accent transition-colors">Home</a>
          <a href="about-founder.html" data-nav="about" class="nav-link px-3.5 py-2 text-base font-medium uppercase tracking-wide text-brand-dark hover:text-brand-accent transition-colors">About Founder</a>
          <a href="${BOOK_URL}" target="_blank" rel="noopener noreferrer" class="nav-link px-3.5 py-2 text-base font-medium uppercase tracking-wide text-brand-dark hover:text-brand-accent transition-colors">Services</a>
          <a href="index.html#gallery" class="nav-link px-3.5 py-2 text-base font-medium uppercase tracking-wide text-brand-dark hover:text-brand-accent transition-colors">Gallery</a>
          <a href="shop.html" data-nav="shop" class="nav-link px-3.5 py-2 text-base font-medium uppercase tracking-wide text-brand-dark hover:text-brand-accent transition-colors">Shop</a>
          <a href="contact-us.html" data-nav="contact" class="nav-link px-3.5 py-2 text-base font-medium uppercase tracking-wide text-brand-dark hover:text-brand-accent transition-colors">Contact Us</a>
          <a href="${BOOK_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary nav-book-btn ml-3 px-7 py-3 text-base font-semibold uppercase tracking-wide">Book Online</a>
        </div>

        <button id="mobile-menu-btn" class="lg:hidden text-brand-dark hover:text-brand-accent transition-colors p-2" aria-label="Open menu" type="button">
          ${ICON_MENU}
        </button>
      </div>
    </div>
  </nav>

  <div id="mobile-menu" class="mobile-menu fixed top-0 right-0 w-80 h-full bg-white lg:hidden">
    <div class="p-6">
      <button id="close-menu-btn" class="absolute top-6 right-6 text-brand-dark hover:text-brand-accent" aria-label="Close menu" type="button">
        ${ICON_CLOSE}
      </button>
      <div class="mt-16 space-y-2">
        <a href="index.html" data-nav="home" class="block px-4 py-3 text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors">Home</a>
        <a href="about-founder.html" data-nav="about" class="block px-4 py-3 text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors">About Founder</a>
        <a href="${BOOK_URL}" target="_blank" rel="noopener noreferrer" class="block px-4 py-3 text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors">Services</a>
        <a href="index.html#gallery" class="block px-4 py-3 text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors">Gallery</a>
        <a href="shop.html" data-nav="shop" class="block px-4 py-3 text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors">Shop</a>
        <a href="contact-us.html" data-nav="contact" class="block px-4 py-3 text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors">Contact Us</a>
        <a href="${BOOK_URL}" target="_blank" rel="noopener noreferrer" class="block btn-primary text-center mt-6 px-6 py-3 font-semibold">Book Online</a>
        <a href="tel:+12032977000" class="flex items-center gap-2 px-4 py-3 text-brand-accent font-semibold mt-4">${ICON_PHONE} 203-297-7000</a>
      </div>
    </div>
  </div>
  <div id="mobile-overlay" class="mobile-overlay fixed inset-0 bg-black/50 hidden" aria-hidden="true"></div>
</header>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="site-footer__inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo-link" aria-label="Veda Healing Spa Home">
          <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/1fec22f0-0bb5-4cc4-962d-a0c9112c1f11/de8c94d8-887e-4625-825f-ec262dbc28df/1785242213_6czo1c.png" alt="Veda Healing Spa" class="footer-logo" width="185" height="170" loading="lazy" decoding="async">
        </a>
        <p class="footer-brand__text">Customized facials with massage on vital facial energy points for healthy skin and ultimate relaxation in Westport, Connecticut.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/105008240868072" target="_blank" rel="noopener noreferrer" class="footer-social__link" aria-label="Facebook">${ICON_FACEBOOK}</a>
          <a href="https://www.instagram.com/vedahealingspa/" target="_blank" rel="noopener noreferrer" class="footer-social__link" aria-label="Instagram">${ICON_INSTAGRAM}</a>
        </div>
      </div>

      <div>
        <h2 class="footer-heading">Quick Links</h2>
        <ul class="footer-list">
          <li><a href="index.html">Home</a></li>
          <li><a href="about-founder.html">About Founder</a></li>
          <li><a href="${BOOK_URL}" target="_blank" rel="noopener noreferrer">Services</a></li>
          <li><a href="index.html#gallery">Gallery</a></li>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="contact-us.html">Contact Us</a></li>
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h2 class="footer-heading">Visit Us</h2>
        <ul class="footer-list">
          <li>Canal House, 315 Main Street<br>Westport, CT 06880</li>
          <li><a href="tel:+12032977000">203-297-7000</a></li>
          <li><a href="mailto:vedahealingspa@gmail.com">vedahealingspa@gmail.com</a></li>
        </ul>
        <p class="footer-hours">Mon–Fri 10am–6pm<br>Sat–Sun 11am–5pm<br>Appointments only.</p>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p>&copy; 2020 Veda Healing Spa - All Rights Reserved.</p>
      <a href="${GIFT_URL}" target="_blank" rel="noopener noreferrer">Purchase an e-gift card</a>
    </div>
  </div>
</footer>
`;

const GIFT_POPUP_HTML = `
<div id="gift-popup" class="gift-popup" hidden>
  <div class="gift-popup__backdrop" data-gift-dismiss tabindex="-1"></div>
  <div class="gift-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="gift-popup-title">
    <button type="button" class="gift-popup__close" data-gift-dismiss aria-label="Close gift card offer">&times;</button>
    <p class="gift-popup__eyebrow">Veda Healing Spa</p>
    <h2 id="gift-popup-title" class="gift-popup__title">Give the gift of radiant skin</h2>
    <p class="gift-popup__text">Surprise someone special with a spa e-gift card for customized facials, energy-point massage, and deep relaxation in Westport.</p>
    <div class="gift-popup__actions">
      <a href="${GIFT_URL}" target="_blank" rel="noopener noreferrer" class="btn-dark gift-popup__cta">Purchase an e-gift card</a>
      <button type="button" class="gift-popup__later" data-gift-dismiss>Maybe later</button>
    </div>
  </div>
</div>
`;

function applyActiveNav(page) {
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
    link.classList.add('text-brand-accent', 'font-semibold');
  });
}

function renderPartials() {
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');

  if (headerMount) {
    headerMount.innerHTML = HEADER_HTML;
    applyActiveNav(document.body.dataset.page || '');
  }

  if (footerMount) {
    footerMount.innerHTML = FOOTER_HTML;
  }

  const existingGift = document.getElementById('gift-bar') || document.getElementById('gift-popup');
  if (existingGift) existingGift.remove();
  document.body.insertAdjacentHTML('beforeend', GIFT_POPUP_HTML);

  document.dispatchEvent(new CustomEvent('site:partials-loaded'));
}

document.addEventListener('DOMContentLoaded', renderPartials);
