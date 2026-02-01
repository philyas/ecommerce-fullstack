import { api } from './client';
import type { ShoppingItem, UpdateItemRequest } from '../types';

export const itemsApi = {
  getAll: () => api.get<ShoppingItem[]>('/items'),
  create: (name: string, quantity?: number) =>
    api.post<ShoppingItem>('/items', { name, quantity }),
  update: (id: string, data: UpdateItemRequest) =>
    api.put<ShoppingItem>(`/items/${id}`, data),
  delete: (id: string) => api.delete<{ message: string; item: ShoppingItem }>(`/items/${id}`),
  deleteAll: () =>
    api.delete<{ message: string; deletedCount: number }>('/items/clear'),
};
