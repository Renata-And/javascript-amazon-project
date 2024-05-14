import { cart } from '../../data/cart-class.js';

export function renderCheckoutHeader() {
  const checkoutHeaderHTML = `
    <div class="checkout-header-middle-section">
      Checkout (<a class="return-to-home-link" href="amazon.html">
      ${cart.createCartQuantity()} items
      </a>)
    </div>
  `;
  document.querySelector('.js-checkout-header-middle-section').innerHTML =
    checkoutHeaderHTML;
}
