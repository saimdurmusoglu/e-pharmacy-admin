import api from './api';

interface OrdersParams {
  name?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const ordersService = {
  getOrders: async (params: OrdersParams = {}) => {
    const { data } = await api.get('/orders', { params });
    return data; // { orders, total, page, totalPages }
  },
};
