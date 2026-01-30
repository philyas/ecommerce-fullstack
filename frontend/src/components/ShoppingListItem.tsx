import { useState } from 'react';
import { ShoppingItem } from '../types';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggleBought: (id: string, bought: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ShoppingListItem({
  item,
  onToggleBought,
  onDelete,
}: ShoppingListItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await onToggleBought(item._id, !item.bought);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(item._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li
      className={`flex items-center gap-4 border-b border-black/[0.06] bg-surface-elevated px-4 py-3.5 last:border-b-0 transition-colors ${
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

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-apple text-label-tertiary hover:bg-red-50 hover:text-red-600 disabled:opacity-50`}
        aria-label="Löschen"
      >
        {isDeleting ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
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
        )}
      </button>
    </li>
  );
}
