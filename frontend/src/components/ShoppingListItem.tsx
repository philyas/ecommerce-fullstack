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
        className={`group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-surface-muted/50 ${
          item.bought ? 'bg-surface/50' : ''
        }`}
      >
        {/* Checkbox */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isUpdating}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            item.bought
              ? 'border-success bg-success text-white'
              : 'border-zinc-200 bg-white hover:border-label-tertiary'
          } ${isUpdating ? 'opacity-50' : ''}`}
          aria-label={item.bought ? 'Als offen markieren' : 'Als erledigt markieren'}
        >
          {item.bought && (
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Name */}
        <span
          className={`min-w-0 flex-1 text-base transition-colors ${
            item.bought ? 'text-label-tertiary line-through' : 'text-label-primary'
          }`}
        >
          {item.name}
        </span>

        {/* Quantity */}
        {item.bought ? (
          <span className="rounded-md bg-surface-muted px-2.5 py-1 text-sm font-medium tabular-nums text-label-tertiary">
            {item.quantity}x
          </span>
        ) : (
          <div className="flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={isUpdatingQuantity || item.quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-md text-label-secondary transition-colors hover:bg-surface-muted hover:text-label-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Menge verringern"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span
              className={`min-w-[2rem] text-center text-sm font-medium tabular-nums ${
                isUpdatingQuantity ? 'text-label-tertiary' : 'text-label-primary'
              }`}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={isUpdatingQuantity || item.quantity >= 999}
              className="flex h-7 w-7 items-center justify-center rounded-md text-label-secondary transition-colors hover:bg-surface-muted hover:text-label-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Menge erhoehen"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        )}

        {/* Delete */}
        {!item.bought && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-label-quaternary opacity-0 transition-all hover:bg-danger-light hover:text-danger group-hover:opacity-100"
            aria-label="Loeschen"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}
      </li>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Produkt entfernen"
        message={`"${item.name}" wird aus der Liste entfernt.`}
        confirmLabel="Entfernen"
        cancelLabel="Abbrechen"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
