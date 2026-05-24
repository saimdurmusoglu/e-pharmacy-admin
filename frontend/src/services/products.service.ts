import api from './api';
import type { Product } from '../types';

interface ProductsParams {
  name?: string;
  category?: string;
  page?: number;
  limit?: number;
}

type ProductPayload = Omit<Product, '_id'>;

export const productsService = {
  getProducts: async (params: ProductsParams = {}) => {
    const { data } = await api.get('/products', { params });
    return data; // { products, total, page, totalPages }
  },

  addProduct: async (payload: ProductPayload) => {
    const { data } = await api.post('/products', payload);
    return data;
  },

  updateProduct: async (productId: string, payload: Partial<ProductPayload>) => {
    const { data } = await api.put(`/products/${productId}`, payload);
    return data;
  },

  deleteProduct: async (productId: string) => {
    const { data } = await api.delete(`/products/${productId}`);
    return data;
  },
};
