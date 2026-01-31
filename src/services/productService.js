import { api } from '../api/api';

const mapProduct = (fakeProduct) => ({
  id: String(fakeProduct.id),
  image: fakeProduct.image,
  name: fakeProduct.title,
  rating: {
    stars: Math.round((fakeProduct.rating?.rate || 0) * 2) / 2,
    count: fakeProduct.rating?.count || 0
  },
  priceCents: Math.round(fakeProduct.price * 100),
  keywords: [fakeProduct.category],
  description: fakeProduct.description
});

export const productService = {
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data.map(mapProduct);
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return mapProduct(response.data);
  }
};
