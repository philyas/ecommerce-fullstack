import { useEffect, useRef, useState } from 'react';

interface EditQuantityModalProps {
  isOpen: boolean;
  itemName: string;
  currentQuantity: number;
  onConfirm: (quantity: number) => Promise<void>;
  onClose: () => void;
}

export function EditQuantityModal({
  isOpen,
  itemName,
  currentQuantity,
  onConfirm,
  onClose,
}: EditQuantityModalProps) {
  const [value, setValue] = useState(String(currentQuantity));
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setValue(String(currentQuantity));
      setError(null);
      const t = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(t);
    }
  }, [isOpen, currentQuantity]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value, 10);
    if (Number.isNaN(num) || num < 1 || num > 999) {
      setError('Bitte eine Zahl zwischen 1 und 999 eingeben.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await onConfirm(num);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-label-primary/20 backdrop-blur-sm animate-fade-in"
        onClick={!isLoading ? onClose : undefined}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quantity-modal-title"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-modal animate-scale-in"
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2
              id="quantity-modal-title"
              className="text-center text-lg font-semibold text-label-primary"
            >
              Menge ändern
            </h2>
            <p className="mt-1 text-center text-sm text-label-secondary">
              {itemName}
            </p>
            <div className="mt-4">
              <input
                ref={inputRef}
                type="number"
                min={1}
                max={999}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null);
                }}
                disabled={isLoading}
                className="input text-center text-lg tabular-nums"
                aria-label="Menge"
              />
              {error && (
                <p className="mt-2 text-center text-sm text-danger">{error}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 border-t border-slate-200 bg-surface-muted/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="btn-secondary flex-1 disabled:opacity-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
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
                'Übernehmen'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
