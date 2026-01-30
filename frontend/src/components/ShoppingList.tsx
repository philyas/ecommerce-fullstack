import { ShoppingItem } from '../types';
import { ShoppingListItem } from './ShoppingListItem';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleBought: (id: string, bought: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ShoppingList({ items, onToggleBought, onDelete }: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black/[0.04]"
          aria-hidden
        >
          <svg
            className="h-7 w-7 text-label-tertiary"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <p className="text-[17px] font-medium text-label-secondary">
          Deine Einkaufsliste ist leer
        </p>
        <p className="mt-1.5 text-[15px] text-label-tertiary">
          Füge oben ein Produkt hinzu
        </p>
      </div>
    );
  }

  const pendingItems = items.filter((item) => !item.bought);
  const boughtItems = items.filter((item) => item.bought);

  return (
    <div className="mt-8">
      {pendingItems.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-[13px] font-medium uppercase tracking-wide text-label-tertiary">
            Zu kaufen ({pendingItems.length})
          </h2>
          <ul className="space-y-0.5 rounded-apple overflow-hidden border border-black/[0.06]">
            {pendingItems.map((item) => (
              <ShoppingListItem
                key={item._id}
                item={item}
                onToggleBought={onToggleBought}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {boughtItems.length > 0 && (
        <div>
          <h2 className="mb-3 text-[13px] font-medium uppercase tracking-wide text-label-tertiary">
            Gekauft ({boughtItems.length})
          </h2>
          <ul className="space-y-0.5 rounded-apple overflow-hidden border border-black/[0.06]">
            {boughtItems.map((item) => (
              <ShoppingListItem
                key={item._id}
                item={item}
                onToggleBought={onToggleBought}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
