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
  async getOrders() {
    await sleep(200);
    return getOrdersFromStorage();
  },

  async getOrder(orderId) {
    await sleep(200);

    const orders = getOrdersFromStorage();
    const order = orders.find(o => o.id === orderId);

    return order;
  },

  async placeOrder(cart) {
    await sleep(500);

    const orders = getOrdersFromStorage();
    const deliveryOptions = await this.getDeliveryOptions();

    const productCostCents = cart.reduce((acc, item) => acc + (item.product.priceCents * item.quantity), 0);
    const shippingCostCents = cart.reduce((acc, item) => {
      const option = deliveryOptions.find(o => o.id === item.deliveryOptionId);
      return acc + (option ? option.priceCents : 0);
    }, 0);
    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = totalCostBeforeTaxCents * 0.1;
    const totalCostCents = totalCostBeforeTaxCents + taxCents;

    const newOrder = {
      id: crypto.randomUUID(),
      orderTimeMs: Date.now(),
      totalCostCents: totalCostCents,
      products: cart.map(item => {
        const option = deliveryOptions.find(o => o.id === item.deliveryOptionId);
        const deliveryDays = option ? option.deliveryDays : 7;
        return {
          ...item,
          estimatedDeliveryTimeMs: Date.now() + (deliveryDays * 24 * 60 * 60 * 1000)
        };
      })
    };

    orders.unshift(newOrder);

    saveOrdersToStorage(orders);

    return newOrder;
  },

  async getDeliveryOptions() {
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

  async getPaymentSummary(cart) {
    await sleep(0);

    const deliveryOptions = await this.getDeliveryOptions();

    const productCostCents = cart.reduce((acc, item) => acc + (item.product.priceCents * item.quantity), 0);
    const shippingCostCents = cart.reduce((acc, item) => {
      const option = deliveryOptions.find(o => o.id === item.deliveryOptionId);
      return acc + (option ? option.priceCents : 0);
    }, 0);
    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = totalCostBeforeTaxCents * 0.1;
    const totalCostCents = totalCostBeforeTaxCents + taxCents;
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return {
      totalItems,
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents
    };
  }
};
