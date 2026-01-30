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
    deleteItem,
  } = useItems();

  return (
    <>
      <header className="mb-10 text-center sm:mb-12">
        <h1 className="text-[34px] font-semibold tracking-tight text-label-primary sm:text-[40px]">
          Einkaufsliste
        </h1>
        <p className="mt-2 text-[17px] text-label-secondary">
          Verwalte deine Einkäufe einfach und übersichtlich
        </p>
      </header>

      <section className="rounded-apple-lg bg-surface-elevated p-6 shadow-card sm:p-8">
        <AddItemForm onAdd={addItem} />

        {error && (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-apple bg-red-50 px-4 py-3 text-[15px] text-red-700">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="shrink-0 font-medium text-red-600 hover:text-red-800"
            >
              Schließen
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-label-tertiary border-t-accent"
              aria-hidden
            />
          </div>
        ) : (
          <ShoppingList
            items={items}
            onToggleBought={toggleBought}
            onDelete={deleteItem}
          />
        )}
      </section>

      <footer className="mt-10 text-center text-[13px] text-label-tertiary">
        <p>
          {items.length} {pluralize(items.length, 'Produkt', 'Produkte')} ·{' '}
          {items.filter((i) => i.bought).length} gekauft
        </p>
      </footer>
    </>
  );
}
