import { api } from './client';
import type {
  ShoppingItem,
  UpdateItemRequest,
  DeleteItemResponse,
  DeleteAllResponse,
} from '../types';

export const itemsApi = {
  getAll: () => api.get<ShoppingItem[]>('/items'),
  create: (name: string, quantity?: number) =>
    api.post<ShoppingItem>('/items', { name, quantity }),
  update: (id: string, data: UpdateItemRequest) =>
    api.put<ShoppingItem>(`/items/${id}`, data),
  delete: (id: string) => api.delete<DeleteItemResponse>(`/items/${id}`),
  deleteAll: () => api.delete<DeleteAllResponse>('/items/clear'),
};
