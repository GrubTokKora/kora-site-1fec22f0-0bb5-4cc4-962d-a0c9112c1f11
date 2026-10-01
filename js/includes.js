const GIFT_URL = 'https://squareup.com/gift/MLMJ25NP8QPZN/order';

const GIFT_POPUP_HTML = `
<div id="gift-popup" class="gift-popup" hidden>
  <div class="gift-popup__backdrop" data-gift-dismiss tabindex="-1"></div>
  <div class="gift-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="gift-popup-title">
    <button type="button" class="gift-popup__close" data-gift-dismiss aria-label="Close gift card offer">&times;</button>
    <p class="gift-popup__eyebrow">Veda Healing Spa</p>
    <h2 id="gift-popup-title" class="gift-popup__title">Give the gift of radiant skin</h2>
    <p class="gift-popup__text">Surprise someone special with a spa e-gift card for customized facials, energy-point massage, and deep relaxation in Fairfield.</p>
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

function currentPage() {
  return (
    (document.body && document.body.dataset.page) ||
    (document.querySelector('[data-page]') && document.querySelector('[data-page]').getAttribute('data-page')) ||
    ''
  );
}

function renderPartials() {
  applyActiveNav(currentPage());

  const existingGift = document.getElementById('gift-bar') || document.getElementById('gift-popup');
  if (existingGift) existingGift.remove();
  document.body.insertAdjacentHTML('beforeend', GIFT_POPUP_HTML);

  document.dispatchEvent(new CustomEvent('site:partials-loaded'));
}

document.addEventListener('DOMContentLoaded', renderPartials);
