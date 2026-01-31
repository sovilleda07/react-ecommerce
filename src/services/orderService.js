const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ORDERS_STORAGE_KEY = 'react-ecommerce-orders';

const getOrdersFromStorage = () => {
  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveOrdersToStorage = (orders) => {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const orderService = {
  getOrders: async () => {
    await sleep(200);
    return getOrdersFromStorage();
  },

  getOrder: async (orderId) => {
    await sleep(200);

    const orders = getOrdersFromStorage();
    const order = orders.find(o => o.id === orderId);

    return order;
  },

  placeOrder: async (cart, deliveryOptionId = '1') => {
    await sleep(500);

    const orders = getOrdersFromStorage();

    const newOrder = {
      id: crypto.randomUUID(),
      orderTimeMs: Date.now(),
      totalCostCents: cart.reduce((acc, item) => acc + (item.product.priceCents * item.quantity), 0),
      products: cart.map(item => ({
        ...item,
        estimatedDeliveryTimeMs: Date.now() + (3 * 24 * 60 * 60 * 1000)
      }))
    };

    orders.unshift(newOrder);

    saveOrdersToStorage(orders);

    return newOrder;
  },

  getDeliveryOptions: async () => {
    await sleep(100);
    return [
      {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
      },
      {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
      },
      {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
      }
    ];
  },

  getPaymentSummary: async (cart) => {
    await sleep(0);

    const itemsPrice = cart.reduce((acc, item) => acc + (item.product.priceCents * item.quantity), 0);
    const shippingPrice = 0;
    const tax = itemsPrice * 0.1;

    return {
      itemsPriceCents: itemsPrice,
      shippingPriceCents: shippingPrice,
      taxCents: tax,
      totalCents: itemsPrice + shippingPrice + tax
    };
  }
};
