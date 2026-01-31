import { ShoppingItem } from '../types';
import { ShoppingListItem } from './ShoppingListItem';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleBought: (id: string, bought: boolean) => Promise<void>;
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ShoppingList({ items, onToggleBought, onUpdateQuantity, onDelete }: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted"
          aria-hidden
        >
          <svg
            className="h-6 w-6 text-label-tertiary"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <p className="text-base font-medium text-label-primary">
          Liste ist leer
        </p>
        <p className="mt-1 text-sm text-label-tertiary">
          Fuege oben ein Produkt hinzu
        </p>
      </div>
    );
  }

  const pendingItems = items.filter((item) => !item.bought);
  const boughtItems = items.filter((item) => item.bought);

  return (
    <div className="space-y-6">
      {pendingItems.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-label-tertiary">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-accent text-[10px] font-bold text-white">
              {pendingItems.length}
            </span>
            Offen
          </h2>
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
            {pendingItems.map((item) => (
              <ShoppingListItem
                key={item._id}
                item={item}
                onToggleBought={onToggleBought}
                onUpdateQuantity={onUpdateQuantity}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      )}

      {boughtItems.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-label-tertiary">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-success text-[10px] font-bold text-white">
              {boughtItems.length}
            </span>
            Erledigt
          </h2>
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
            {boughtItems.map((item) => (
              <ShoppingListItem
                key={item._id}
                item={item}
                onToggleBought={onToggleBought}
                onUpdateQuantity={onUpdateQuantity}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
