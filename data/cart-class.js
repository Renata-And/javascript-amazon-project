class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  getProductFromCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    return matchingItem;
  }

  addToCart(productId) {
    const matchingItem = this.getProductFromCart(productId);

    const quantity = document.querySelector(
      `.js-quantity-selector-${productId}`
    )
      ? Number(
          document.querySelector(`.js-quantity-selector-${productId}`).value
        )
      : 1;

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1',
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  createCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.getProductFromCart(productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.getProductFromCart(productId);
    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }
}

export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
