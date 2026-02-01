import { useState, useEffect, useCallback } from 'react';
import { ShoppingItem } from '../types';
import { itemsApi } from '../api/itemsApi';
import { getErrorMessage } from '../utils/error';

export function useItems() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setError(null);
      const data = await itemsApi.getAll();
      setItems(data);
    } catch (err) {
      setError(getErrorMessage(err) || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = useCallback(async (name: string, quantity?: number) => {
    try {
      setError(null);
      const newItem = await itemsApi.create(name, quantity);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      setError(getErrorMessage(err) || 'Failed to add item');
      throw err;
    }
  }, []);

  const toggleBought = useCallback(async (id: string, bought: boolean) => {
    try {
      setError(null);
      const updatedItem = await itemsApi.update(id, { bought });
      setItems((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item))
      );
    } catch (err) {
      setError(getErrorMessage(err) || 'Failed to update item');
      throw err;
    }
  }, []);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    try {
      setError(null);
      const updatedItem = await itemsApi.update(id, { quantity });
      setItems((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item))
      );
    } catch (err) {
      setError(getErrorMessage(err) || 'Failed to update quantity');
      throw err;
    }
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    try {
      setError(null);
      await itemsApi.delete(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(getErrorMessage(err) || 'Failed to delete item');
      throw err;
    }
  }, []);

  const deleteAll = useCallback(async () => {
    try {
      setError(null);
      await itemsApi.deleteAll();
      setItems([]);
    } catch (err) {
      setError(getErrorMessage(err) || 'Fehler beim Löschen aller Einträge');
      throw err;
    }
  }, []);

  return {
    items,
    loading,
    error,
    setError,
    addItem,
    toggleBought,
    updateQuantity,
    deleteItem,
    deleteAll,
    refetch: fetchItems,
  };
}
