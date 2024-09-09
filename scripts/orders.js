import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from '../data/cart-class.js';

function renderOrders() {
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime).format('MMMM D, HH:mm');

    ordersHTML += `
      <div class="order-container">
            
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${renderOrderDetails()}
      </div>
    </div>
    `;

    function renderOrderDetails() {
      let orderDetail = '';

      order.products.forEach((product) => {
        const matchingProduct = getProduct(product.productId);
        const deliveryDate = dayjs(product.estimatedDeliveryTime).format(
          'MMMM D'
        );

        orderDetail += `
          <div class="product-image-container">
            <img src=${matchingProduct.image}>
          </div>
  
          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${deliveryDate}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${product.productId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
  
          <div class="product-actions">
              <button class="track-package-button js-track-package-button button-secondary" data-product-id="${product.productId}" data-order-id="${order.id}">
                Track package
              </button>
          </div>
        `;
      });
      return orderDetail;
    }
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      cart.saveToStorage();
      cartQuantityElement.innerText = cart.createCartQuantity();

      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });

  document.querySelectorAll('.js-track-package-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId, orderId } = button.dataset;
      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
    });
  });

  cartQuantityElement.innerText = cart.createCartQuantity();
}

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  renderOrders();
}

loadPage();
