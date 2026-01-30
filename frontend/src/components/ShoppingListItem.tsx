import { useState } from 'react';
import { ShoppingItem } from '../types';
import { ConfirmModal } from './ConfirmModal';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggleBought: (id: string, bought: boolean) => Promise<void>;
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ShoppingListItem({
  item,
  onToggleBought,
  onUpdateQuantity,
  onDelete,
}: ShoppingListItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await onToggleBought(item._id, !item.bought);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityChange = async (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1 || newQuantity > 999) return;

    setIsUpdatingQuantity(true);
    try {
      await onUpdateQuantity(item._id, newQuantity);
    } finally {
      setIsUpdatingQuantity(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(item._id);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <li
        className={`flex items-center gap-3 border-b border-black/[0.06] bg-surface-elevated px-4 py-3 last:border-b-0 transition-colors ${
          item.bought ? 'opacity-75' : ''
        }`}
      >
        <button
          type="button"
          onClick={handleToggle}
          disabled={isUpdating}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            item.bought
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-label-tertiary bg-transparent hover:border-accent'
          } ${isUpdating ? 'opacity-50' : ''}`}
          aria-label={item.bought ? 'Als nicht gekauft markieren' : 'Als gekauft markieren'}
        >
          {item.bought && (
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <span
          className={`min-w-0 flex-1 text-[17px] text-label-primary ${
            item.bought ? 'line-through text-label-tertiary' : ''
          }`}
        >
          {item.name}
        </span>

        {/* Quantity Controls */}
        {item.bought ? (
          <span className="min-w-[2.5rem] text-center text-[15px] font-medium tabular-nums text-label-tertiary">
            {item.quantity}x
          </span>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={isUpdatingQuantity || item.quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-black/[0.04] text-label-secondary hover:bg-black/[0.08] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Menge verringern"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span
              className={`min-w-[2.5rem] text-center text-[15px] font-medium tabular-nums ${
                isUpdatingQuantity ? 'opacity-50' : 'text-label-primary'
              }`}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={isUpdatingQuantity || item.quantity >= 999}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-black/[0.04] text-label-secondary hover:bg-black/[0.08] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Menge erhoehen"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              </svg>
            </button>
          </div>
        )}

        {!item.bought && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-label-tertiary hover:bg-red-50 hover:text-red-600 transition-colors"
            aria-label="Loeschen"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </li>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Produkt entfernen"
        message={`Moechtest du "${item.name}" wirklich aus der Liste entfernen?`}
        confirmLabel="Entfernen"
        cancelLabel="Abbrechen"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
