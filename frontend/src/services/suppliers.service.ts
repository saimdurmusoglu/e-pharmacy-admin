import api from './api';

interface SuppliersParams {
  name?: string;
  status?: string;
  page?: number;
  limit?: number;
}

interface SupplierPayload {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
  photo?: string;
}

export const suppliersService = {
  getSuppliers: async (params: SuppliersParams = {}) => {
    const { data } = await api.get('/suppliers', { params });
    return data; // { suppliers, total, page, totalPages }
  },

  addSupplier: async (payload: SupplierPayload) => {
    const { data } = await api.post('/suppliers', payload);
    return data;
  },

  updateSupplier: async (supplierId: string, payload: Partial<SupplierPayload>) => {
    const { data } = await api.put(`/suppliers/${supplierId}`, payload);
    return data;
  },
};
