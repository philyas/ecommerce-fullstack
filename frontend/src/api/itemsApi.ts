import { api } from './client';
import type { ShoppingItem } from '../types';

export const itemsApi = {
  getAll: () => api.get<ShoppingItem[]>('/items'),
  create: (name: string) => api.post<ShoppingItem>('/items', { name }),
  updateBought: (id: string, bought: boolean) =>
    api.put<ShoppingItem>(`/items/${id}`, { bought }),
  delete: (id: string) => api.delete<{ message: string; item: ShoppingItem }>(`/items/${id}`),
};
