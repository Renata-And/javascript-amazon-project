import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function renderOrderTracking() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const product = getProduct(productId);
  const productQuantity = getProductFromOrder().quantity;
  const deliveryDate = dayjs(
    getProductFromOrder().estimatedDeliveryTime
  ).format('MMMM D');

  const currenTime = dayjs();
  const orderTime = dayjs(getOrder().orderTime);
  const deliveryTime = dayjs(getProductFromOrder().estimatedDeliveryTime);
  const progressPercent =
    ((currenTime - orderTime) / (deliveryTime - orderTime)) * 100;

  let orderTrackingHtml = '';

  function getOrder() {
    let matchingOrder;
    orders.forEach((order) => {
      if (orderId === order.id) {
        matchingOrder = order;
      }
    });
    return matchingOrder;
  }

  function getProductFromOrder() {
    let matchingProduct;
    let order = getOrder();

    if (orderId === order.id) {
      order.products.forEach((product) => {
        if (productId === product.productId) {
          matchingProduct = product;
        }
      });
    }
    return matchingProduct;
  }

  orderTrackingHtml += `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryDate}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productQuantity}
    </div>

    <img class="product-image" src=${product.image}>

    <div class="progress-labels-container">
      <div class="progress-label ${
        progressPercent < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        progressPercent >= 50 && progressPercent < 100 ? 'current status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        progressPercent >= 100 ? 'current-status' : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressPercent}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = orderTrackingHtml;
}

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  renderOrderTracking();
}

loadPage();
