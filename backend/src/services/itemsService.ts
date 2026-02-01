/**
 * Items Service.
 * Implementiert die Business-Logik für Shopping Items.
 * Folgt dem Interface Segregation Principle.
 */

import { ShoppingItem } from '../models/ShoppingItem.js';
import type { IShoppingItemDocument } from '../models/ShoppingItem.js';
import type { IItemsService, UpdateItemDTO } from '../types/index.js';

/**
 * Items Service Implementation.
 * Kapselt alle Datenbankoperationen für Shopping Items.
 */
class ItemsService implements IItemsService {
  /**
   * Findet alle Items, sortiert nach Erstellungsdatum (neueste zuerst).
   */
  async findAll(): Promise<IShoppingItemDocument[]> {
    return ShoppingItem.find().sort({ createdAt: -1 });
  }

  /**
   * Erstellt ein neues Item.
   * @param name - Der Name des Items (wird getrimmt)
   * @param quantity - Die Menge (Standard: 1)
   */
  async create(name: string, quantity: number = 1): Promise<IShoppingItemDocument> {
    const newItem = new ShoppingItem({
      name: name.trim(),
      quantity,
      bought: false,
    });
    return newItem.save();
  }

  /**
   * Aktualisiert ein Item anhand seiner ID.
   * @param id - Die MongoDB ObjectId
   * @param updates - Die zu aktualisierenden Felder
   * @returns Das aktualisierte Item oder null wenn nicht gefunden
   */
  async update(id: string, updates: UpdateItemDTO): Promise<IShoppingItemDocument | null> {
    return ShoppingItem.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
  }

  /**
   * Löscht ein Item anhand seiner ID.
   * @param id - Die MongoDB ObjectId
   * @returns Das gelöschte Item oder null wenn nicht gefunden
   */
  async deleteById(id: string): Promise<IShoppingItemDocument | null> {
    return ShoppingItem.findByIdAndDelete(id);
  }

  /**
   * Löscht alle Items.
   * @returns Die Anzahl der gelöschten Items
   */
  async deleteAll(): Promise<{ deletedCount: number }> {
    const result = await ShoppingItem.deleteMany({});
    return { deletedCount: result.deletedCount };
  }
}

// Singleton-Export für Dependency Injection
export const itemsService = new ItemsService();
