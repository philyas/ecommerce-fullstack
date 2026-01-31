import { useState, useRef, useEffect } from 'react';
import { AddItemForm } from '../components/AddItemForm';
import { CongratsModal } from '../components/CongratsModal';
import { ShoppingList } from '../components/ShoppingList';
import { Toast } from '../components/Toast';
import { useItems } from '../hooks/useItems';
import { pluralize } from '../utils/string';

export function ShoppingListPage() {
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: '',
  });
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const prevPendingCountRef = useRef<number | undefined>(undefined);

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

  useEffect(() => {
    const prev = prevPendingCountRef.current;
    prevPendingCountRef.current = pendingCount;
    if (
      items.length > 0 &&
      pendingCount === 0 &&
      prev !== undefined &&
      prev > 0
    ) {
      setShowCongratsModal(true);
    }
  }, [items.length, pendingCount]);

  return (
    <div className="flex min-h-0 flex-1 flex-col animate-fade-in">
      {(!loading || items.length > 0) && (
        <p className="mb-4 shrink-0 text-base text-label-secondary sm:mb-6">
          {items.length === 0
            ? 'Fuege dein erstes Produkt hinzu'
            : `${pendingCount} offen, ${boughtCount} erledigt`}
        </p>
      )}

      {/* Form + Fehler – außerhalb, nicht scrollbar */}
      <div className="shrink-0">
        <div className="card p-6">
          <AddItemForm
            onAdd={addItem}
            onSuccess={(name) => {
              setToast({ visible: true, message: `"${name}" hinzugefuegt` });
            }}
          />

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
        </div>
      </div>

      {/* Nur Produkte – feste Höhe (100vh minus Rest), bei vielen Produkten scrollbar */}
      <div className="mt-6">
        <div className="card flex max-h-[36rem] min-h-[12rem] flex-col overflow-hidden" style={{ height: 'min(calc(100vh - 450px), 36rem)' }}>
          {loading ? (
            <div className="flex flex-1 items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-accent" />
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              <ShoppingList
                items={items}
                onToggleBought={toggleBought}
                onUpdateQuantity={updateQuantity}
                onDelete={deleteItem}
              />
            </div>
          )}
        </div>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast((p) => ({ ...p, visible: false }))}
        duration={1500}
      />

      <CongratsModal
        isOpen={showCongratsModal}
        onClose={() => setShowCongratsModal(false)}
      />

      {items.length > 0 && (
        <footer className="mt-4 shrink-0 text-center sm:mt-6">
          <p className="text-sm text-label-tertiary">
            {items.length} {pluralize(items.length, 'Produkt', 'Produkte')} insgesamt
          </p>
        </footer>
      )}
    </div>
  );
}
