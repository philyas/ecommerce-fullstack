/**
 * Zentrale Type-Definitionen für das Backend.
 * Single Source of Truth für alle Datenstrukturen.
 */

// ============================================================================
// Domain Types
// ============================================================================

export interface ShoppingItemData {
  name: string;
  quantity: number;
  bought: boolean;
  createdAt: Date;
}

// ============================================================================
// DTO (Data Transfer Objects)
// ============================================================================

export interface CreateItemDTO {
  name: string;
  quantity?: number;
}

export interface UpdateItemDTO {
  bought?: boolean;
  quantity?: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ErrorResponse {
  error: string;
}

export interface DeleteResponse {
  message: string;
  deletedCount?: number;
}

export interface DeleteItemResponse {
  message: string;
  item: ShoppingItemData;
}

// ============================================================================
// Service Interface (Dependency Inversion)
// ============================================================================

export interface IItemsService {
  findAll(): Promise<ShoppingItemData[]>;
  create(name: string, quantity?: number): Promise<ShoppingItemData>;
  update(id: string, updates: UpdateItemDTO): Promise<ShoppingItemData | null>;
  deleteById(id: string): Promise<ShoppingItemData | null>;
  deleteAll(): Promise<{ deletedCount: number }>;
}
