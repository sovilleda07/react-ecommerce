const CART_STORAGE_KEY = 'react-ecommerce-cart';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCartFromStorage = () => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const cartService = {
  getCart: async () => {
    await sleep(100);
    return getCartFromStorage();
  },

  addToCart: async (product, quantity) => {
    await sleep(100);

    const cart = getCartFromStorage();
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += parseInt(quantity, 10);
    } else {
      cart.push({
        productId: product.id,
        quantity: parseInt(quantity, 10),
        product: product,
        deliveryOptionId: '1'
      });
    }

    saveCartToStorage(cart);
    return cart;
  },

  updateQuantity: async (productId, quantity) => {
    await sleep(100);

    let cart = getCartFromStorage();

    if (quantity <= 0) {
      cart = cart.filter(item => item.productId !== productId);
    } else {
      const item = cart.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    }

    saveCartToStorage(cart);

    return cart;
  },

  updateDeliveryOption: async (productId, deliveryOptionId) => {
    await sleep(100);

    let cart = getCartFromStorage();

    const item = cart.find(item => item.productId === productId);

    if (item) {
      item.deliveryOptionId = deliveryOptionId;
    }

    saveCartToStorage(cart);

    return cart;
  },

  removeFromCart: async (productId) => {
    await sleep(100);

    let cart = getCartFromStorage();
    cart = cart.filter(item => item.productId !== productId);

    saveCartToStorage(cart);

    return cart;
  },

  clearCart: async () => {
    await sleep(100);
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};
