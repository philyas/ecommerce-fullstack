import { ShoppingItem } from '../models/ShoppingItem.js';
import type { IShoppingItemDocument } from '../models/ShoppingItem.js';

export const itemsService = {
  async findAll(): Promise<IShoppingItemDocument[]> {
    return ShoppingItem.find().sort({ createdAt: -1 });
  },

  async create(name: string): Promise<IShoppingItemDocument> {
    const newItem = new ShoppingItem({
      name: name.trim(),
      bought: false,
    });
    return newItem.save();
  },

  async updateBought(id: string, bought: boolean): Promise<IShoppingItemDocument | null> {
    return ShoppingItem.findByIdAndUpdate(
      id,
      { bought },
      { new: true, runValidators: true }
    );
  },

  async deleteById(id: string): Promise<IShoppingItemDocument | null> {
    return ShoppingItem.findByIdAndDelete(id);
  },
};
