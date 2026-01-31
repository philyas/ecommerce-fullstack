import { AddItemForm } from '../components/AddItemForm';
import { ShoppingList } from '../components/ShoppingList';
import { useItems } from '../hooks/useItems';
import { pluralize } from '../utils/string';

export function ShoppingListPage() {
  const {
    items,
    loading,
    error,
    setError,
    addItem,
    toggleBought,
    updateQuantity,
    deleteItem,
  } = useItems();

  const pendingCount = items.filter((i) => !i.bought).length;
  const boughtCount = items.filter((i) => i.bought).length;

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-label-primary">
          Einkaufsliste
        </h1>
        <p className="mt-2 text-base text-label-secondary">
          {items.length === 0
            ? 'Fuege dein erstes Produkt hinzu'
            : `${pendingCount} offen, ${boughtCount} erledigt`}
        </p>
      </header>

      <div className="card p-6">
        <AddItemForm onAdd={addItem} />

        {error && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-danger-light px-4 py-3">
            <span className="text-sm text-danger">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-sm font-medium text-danger hover:text-danger-hover transition-colors"
            >
              Schliessen
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-accent" />
          </div>
        ) : (
          <ShoppingList
            items={items}
            onToggleBought={toggleBought}
            onUpdateQuantity={updateQuantity}
            onDelete={deleteItem}
          />
        )}
      </div>

      {items.length > 0 && (
        <footer className="mt-6 text-center">
          <p className="text-sm text-label-tertiary">
            {items.length} {pluralize(items.length, 'Produkt', 'Produkte')} insgesamt
          </p>
        </footer>
      )}
    </div>
  );
}
