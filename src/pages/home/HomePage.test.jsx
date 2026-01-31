import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';
import { productService } from '../../services/productService';
import { cartService } from '../../services/cartService';

vi.mock('../../services/productService');
vi.mock('../../services/cartService');

describe('HomePage component', () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    productService.getProducts.mockResolvedValue([
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"]
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127
        },
        priceCents: 2095,
        keywords: ["sports", "basketballs"]
      }
    ]);

    user = userEvent.setup();
  });

  it('displays the products correct', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0])
        .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1])
        .getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });

  it('filters products by name', async () => {
    render(
      <MemoryRouter initialEntries={['/?search=socks']}>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container');
    expect(productContainers.length).toBe(1);

    expect(
      within(productContainers[0])
        .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();
  });

  it('filters products by keyword', async () => {
    render(
      <MemoryRouter initialEntries={['/?search=basketballs']}>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container');
    expect(productContainers.length).toBe(1);

    expect(
      within(productContainers[0])
        .getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });
});