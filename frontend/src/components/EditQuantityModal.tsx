import { useEffect, useState } from 'react';
import { QuantityStepper } from './QuantityStepper';

interface EditQuantityModalProps {
  isOpen: boolean;
  itemName: string;
  currentQuantity: number;
  onConfirm: (quantity: number) => Promise<void>;
  onClose: () => void;
  min?: number;
  max?: number;
  title?: string;
}

export function EditQuantityModal({
  isOpen,
  itemName,
  currentQuantity,
  onConfirm,
  onClose,
  min = 1,
  max = 999,
  title = 'Menge ändern',
}: EditQuantityModalProps) {
  const [value, setValue] = useState(currentQuantity);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValue(currentQuantity);
      setError(null);
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
    if (value < min || value > max) {
      setError(`Bitte eine Zahl zwischen ${min} und ${max} eingeben.`);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await onConfirm(value);
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
              {title}
            </h2>
            {itemName && (
              <p className="mt-1 text-center text-sm text-label-secondary">
                {itemName}
              </p>
            )}
            <div className="mt-5 flex flex-col items-center gap-4">
              <QuantityStepper
                value={value}
                onChange={setValue}
                min={min}
                max={max}
                presets={[1, 2, 3, 5, 10, 20, 50]}
                size="comfortable"
                className="justify-center"
                disabled={isLoading}
              />
              {error && (
                <p className="text-center text-sm text-danger">{error}</p>
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
