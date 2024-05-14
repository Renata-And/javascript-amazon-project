import { cart } from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //       quantity: 1,
    //       deliveryOptionId: '1',
    //     },
    //   ]);
    // });

    // loadFromStorage();

    cart.cartItems = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1',
      },
    ];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1',
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([]);
    // });

    // loadFromStorage();

    cart.cartItems = [];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1',
        },
      ])
    );
  });
});

describe('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = 'dd82ca78-a18b-4e2a-9250-31e67412f98d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];

    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 2,
    //       deliveryOptionId: '1',
    //     },
    //     {
    //       productId: productId2,
    //       quantity: 1,
    //       deliveryOptionId: '2',
    //     },
    //   ]);
    // });
  });

  it('remove a productId that is in the cart', () => {
    // loadFromStorage();

    cart.removeFromCart(productId1);

    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify([
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2',
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(cart.cartItems[0].quantity).toEqual(1);
  });

  it('remove a productId that is not in the cart', () => {
    // loadFromStorage();

    cart.removeFromCart(productId3);

    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1',
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2',
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[1].productId).toEqual(productId2);
  });
});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //       quantity: 2,
    //       deliveryOptionId: '1',
    //     },
    //   ]);
    // });

    cart.cartItems = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
    ];
  });

  it('update the delivery option of a product in the cart', () => {
    // loadFromStorage();

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '3',
        },
      ])
    );
  });

  it('update the delivery option of a product NOT in the cart', () => {
    // loadFromStorage();

    cart.updateDeliveryOption('3ebe75dc-64d2-4137-8860-1f5a963e534b', '3');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing is delivery option does not exist', () => {
    // loadFromStorage();

    cart.updateDeliveryOption('3ebe75dc-64d2-4137-8860-1f5a963e534b', '8');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
