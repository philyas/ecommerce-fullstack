import { ShoppingItem } from '../models/ShoppingItem.js';
import type { IShoppingItemDocument } from '../models/ShoppingItem.js';

export const itemsService = {
  async findAll(): Promise<IShoppingItemDocument[]> {
    return ShoppingItem.find().sort({ createdAt: -1 });
  },

  async create(name: string, quantity: number = 1): Promise<IShoppingItemDocument> {
    const newItem = new ShoppingItem({
      name: name.trim(),
      quantity,
      bought: false,
    });
    return newItem.save();
  },

  async update(
    id: string,
    updates: { bought?: boolean; quantity?: number }
  ): Promise<IShoppingItemDocument | null> {
    return ShoppingItem.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
  },

  async deleteById(id: string): Promise<IShoppingItemDocument | null> {
    return ShoppingItem.findByIdAndDelete(id);
  },
};
