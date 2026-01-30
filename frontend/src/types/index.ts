export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  name: string;
}

export interface UpdateItemRequest {
  bought: boolean;
}
