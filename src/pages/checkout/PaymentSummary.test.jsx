import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { PaymentSummary } from './PaymentSummary';
import { orderService } from '../../services/orderService';
import { cartService } from '../../services/cartService';

vi.mock('../../services/orderService');
vi.mock('../../services/cartService');

describe('PaymentSummary component', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };

    loadCart = vi.fn();
    user = userEvent.setup();
    orderService.placeOrder.mockResolvedValue({});
  });

  it('displays the correct details', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} cart={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Items (3):')).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-product-cost')
    ).toHaveTextContent('$42.75');

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$47.74');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$4.77');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$52.51');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    const cart = []; 

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(orderService.placeOrder).toHaveBeenCalledWith(cart);
    expect(cartService.clearCart).toHaveBeenCalled();
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
});
