export interface ShoppingItem {
  _id: string;
  name: string;
  quantity: number;
  bought: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  name: string;
  quantity?: number;
}

export interface UpdateItemRequest {
  bought?: boolean;
  quantity?: number;
}
