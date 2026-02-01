/**
 * Modal zum Bearbeiten der Produktmenge.
 * Nutzt useModal Hook für einheitliche Modal-Logik.
 */

import { useEffect, useState } from 'react';
import { useModal } from '../hooks/useModal';
import { QuantityStepper } from './QuantityStepper';
import { LoadingSpinner } from './LoadingSpinner';
import { VALIDATION, QUANTITY_PRESETS } from '../constants';

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
  min = VALIDATION.QUANTITY_MIN,
  max = VALIDATION.QUANTITY_MAX,
  title = 'Menge ändern',
}: EditQuantityModalProps) {
  const [value, setValue] = useState(currentQuantity);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setValue(currentQuantity);
      setError(null);
    }
  }, [isOpen, currentQuantity]);

  useModal({
    isOpen,
    onClose,
    isLoading,
  });

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
                presets={QUANTITY_PRESETS.EDIT_MODAL}
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
              {isLoading ? <LoadingSpinner /> : 'Übernehmen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
