import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { TrackingPage } from './TrackingPage';
import { orderService } from '../services/orderService';
import dayjs from 'dayjs';

vi.mock('../services/orderService');

describe('TrackingPage component', () => {
  const orderId = 'test-order-id';
  const productId = 'test-product-id';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders progress bar with 0% for new orders', async () => {
    const orderTimeMs = dayjs().subtract(0, 'minutes').valueOf(); // Just now
    const estimatedDeliveryTimeMs = dayjs().add(3, 'days').valueOf();

    orderService.getOrder.mockResolvedValue({
      id: orderId,
      orderTimeMs: orderTimeMs,
      products: [{
        productId: productId,
        quantity: 1,
        estimatedDeliveryTimeMs: estimatedDeliveryTimeMs,
        product: {
          id: productId,
          name: 'Test Product',
          image: 'test-image.jpg'
        }
      }]
    });

    render(
      <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={[]} />} />
        </Routes>
      </MemoryRouter>
    );

    const progressBar = await screen.findByTestId('progress-bar');
    expect(progressBar).toHaveStyle('width: 5%');

    const preparingLabel = screen.getByText('Preparing');
    expect(preparingLabel).toHaveClass('current-status');
  });

  it('renders progress bar with 50% for halfway orders', async () => {
    const orderTimeMs = dayjs().subtract(2, 'days').valueOf();
    const estimatedDeliveryTimeMs = dayjs().add(2, 'days').valueOf();

    orderService.getOrder.mockResolvedValue({
      id: orderId,
      orderTimeMs: orderTimeMs,
      products: [{
        productId: productId,
        quantity: 1,
        estimatedDeliveryTimeMs: estimatedDeliveryTimeMs,
        product: {
          id: productId,
          name: 'Test Product',
          image: 'test-image.jpg'
        }
      }]
    });

    render(
      <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={[]} />} />
        </Routes>
      </MemoryRouter>
    );

    const progressBar = await screen.findByTestId('progress-bar');
    const style = progressBar.style.width;
    const widthVal = parseFloat(style);
    expect(widthVal).toBeCloseTo(50, 0);
    
    const shippedLabel = screen.getByText('Shipped');
    expect(shippedLabel).toHaveClass('current-status');
  });

  it('renders progress bar with 100% for delivered orders', async () => {
    const orderTimeMs = dayjs().subtract(5, 'days').valueOf();
    const estimatedDeliveryTimeMs = dayjs().subtract(1, 'days').valueOf();

    orderService.getOrder.mockResolvedValue({
      id: orderId,
      orderTimeMs: orderTimeMs,
      products: [{
        productId: productId,
        quantity: 1,
        estimatedDeliveryTimeMs: estimatedDeliveryTimeMs,
        product: {
          id: productId,
          name: 'Test Product',
          image: 'test-image.jpg'
        }
      }]
    });

    render(
      <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={[]} />} />
        </Routes>
      </MemoryRouter>
    );

    const progressBar = await screen.findByTestId('progress-bar');
    expect(progressBar.style.width).toBe('100%');

    const deliveredLabel = screen.getByText('Delivered');
    expect(deliveredLabel).toHaveClass('current-status');
  });
});
