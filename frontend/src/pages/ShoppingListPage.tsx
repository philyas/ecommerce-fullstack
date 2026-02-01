import { useState, useRef, useEffect } from 'react';
import { AddItemForm } from '../components/AddItemForm';
import { ConfirmModal } from '../components/ConfirmModal';
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
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
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
    deleteAll,
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
            ? 'Füge dein erstes Produkt hinzu'
            : `${pendingCount} offen, ${boughtCount} erledigt`}
        </p>
      )}

      {/* Form + Fehler – außerhalb, nicht scrollbar */}
      <div className="shrink-0">
        <div className="card p-4 sm:p-6">
          <AddItemForm
            onAdd={addItem}
            onSuccess={(name, quantity) => {
              const msg =
                quantity && quantity > 1
                  ? `"${name}" (${quantity}×) hinzugefügt`
                  : `"${name}" hinzugefügt`;
              setToast({ visible: true, message: msg });
            }}
          />

          {error && (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-danger-light px-4 py-3">
              <span className="text-sm text-danger">{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-sm font-medium text-danger hover:text-danger-hover transition-colors"
              >
                Schließen
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nur Produkte – feste Höhe (100vh minus Rest), bei vielen Produkten scrollbar */}
      <div className="mt-6">
        <div className="card flex min-h-[12rem] flex-col overflow-hidden" style={{ height: 'min(calc(100vh - 380px), 42rem)' }}>
          {items.length > 0 && !loading && (
            <div className="flex shrink-0 items-center justify-end border-b border-slate-200 bg-surface-muted/30 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setShowDeleteAllConfirm(true)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger-light hover:text-danger-hover"
                aria-label="Alle Einträge löschen"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Alle löschen
              </button>
            </div>
          )}
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

      <ConfirmModal
        isOpen={showDeleteAllConfirm}
        title="Alle Einträge löschen?"
        message="Diese Aktion löscht alle Produkte aus deiner Liste. Das lässt sich nicht rückgängig machen."
        confirmLabel="Alle löschen"
        cancelLabel="Abbrechen"
        isLoading={isDeletingAll}
        onConfirm={async () => {
          setIsDeletingAll(true);
          try {
            await deleteAll();
            setShowDeleteAllConfirm(false);
            setToast({ visible: true, message: 'Liste geleert' });
          } finally {
            setIsDeletingAll(false);
          }
        }}
        onCancel={() => !isDeletingAll && setShowDeleteAllConfirm(false)}
      />

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
