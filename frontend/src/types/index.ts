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

/** Response von DELETE /items/:id */
export interface DeleteItemResponse {
  message: string;
  item: ShoppingItem;
}

/** Response von DELETE /items/clear */
export interface DeleteAllResponse {
  message: string;
  deletedCount: number;
}
