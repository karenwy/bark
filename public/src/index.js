import './styles/main.scss';

// Small helper to toggle classes and manage focus restoration
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

const body = document.body;
const cart = qs('.js-cart');
const overlay = qs('.js-overlay');
const btnClose = qs('.js-cart-close');
const cartOpenButtons = qsa('.js-open-cart');
const addToBagButtons = qsa('.js-add-to-bag');

let activeTrigger = null; // store last focused trigger to restore focus later

function openCart() {
  cart.classList.add('cart--open');
  overlay.classList.add('is-visible');
  body.classList.add('no-scroll');
  cart.setAttribute('aria-hidden', 'false');
  // focus management
  btnClose && btnClose.focus();
}

function closeCart() {
  cart.classList.remove('cart--open');
  overlay.classList.remove('is-visible');
  body.classList.remove('no-scroll');
  cart.setAttribute('aria-hidden', 'true');
  if (activeTrigger) activeTrigger.focus();
  activeTrigger = null;
}

// close handlers
overlay.addEventListener('click', closeCart);
btnClose.addEventListener('click', closeCart);

// allow ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cart.classList.contains('cart--open')) {
    closeCart();
  }
});

// clicking any "open cart" top button opens immediately
cartOpenButtons.forEach(b => b.addEventListener('click', (e) => {
  activeTrigger = e.currentTarget;
  openCart();
}));

// Add-to-bag: show loading for 1s, then open cart
addToBagButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const button = e.currentTarget;
    activeTrigger = button;

    // visually indicate loading (class on button)
    button.classList.add('is-loading');
    button.setAttribute('aria-busy', 'true');

    // 1s loading animation before showing cart
    setTimeout(() => {
      // remove loading
      button.classList.remove('is-loading');
      button.removeAttribute('aria-busy');

      // optionally update cart content here (pre-populated allowed)
      openCart();
    }, 1000);
  });
});