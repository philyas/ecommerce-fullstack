/**
 * Formular zum Hinzufügen neuer Produkte.
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { EditQuantityModal } from './EditQuantityModal';
import { QuantityStepper } from './QuantityStepper';
import { LoadingSpinner } from './LoadingSpinner';
import { VALIDATION, QUANTITY_PRESETS } from '../constants';

interface AddItemFormProps {
  onAdd: (name: string, quantity?: number) => Promise<void>;
  onSuccess?: (name: string, quantity?: number) => void;
}

export function AddItemForm({ onAdd, onSuccess }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(VALIDATION.QUANTITY_MIN);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const shouldFocusRef = useRef(false);

  // Auto-focus nach Submit
  useEffect(() => {
    if (!isSubmitting && shouldFocusRef.current) {
      shouldFocusRef.current = false;
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setIsSubmitting(true);
    shouldFocusRef.current = true;

    try {
      await onAdd(trimmedName, quantity);
      setName('');
      setQuantity(VALIDATION.QUANTITY_MIN);
      onSuccess?.(trimmedName, quantity);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      quantityInputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-3"
    >
      {/* Produktname */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleNameKeyDown}
        placeholder="Neues Produkt..."
        disabled={isSubmitting}
        className="input min-w-0 flex-1"
        autoFocus
        aria-label="Produktname"
      />

      {/* Menge */}
      <div className="flex items-center justify-between gap-3 sm:justify-start sm:shrink-0">
        <span className="text-sm font-medium text-label-secondary sm:sr-only">
          Menge
        </span>
        <QuantityStepper
          inputRef={quantityInputRef}
          value={quantity}
          onChange={setQuantity}
          min={VALIDATION.QUANTITY_MIN}
          max={VALIDATION.QUANTITY_MAX_ADD}
          presets={QUANTITY_PRESETS.ADD_FORM}
          size="comfortable"
          className="flex-1 sm:flex-initial"
          disabled={isSubmitting}
          onMobileNumberTap={() => setShowQuantityModal(true)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !name.trim()}
        className="btn-primary order-last w-full shrink-0 px-6 sm:order-none sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={quantity > 1 ? `${quantity}x hinzufügen` : 'Hinzufügen'}
      >
        {isSubmitting ? <LoadingSpinner /> : <PlusIcon />}
      </button>

      {/* Mobile Quantity Modal */}
      <EditQuantityModal
        isOpen={showQuantityModal}
        itemName=""
        title="Menge eingeben"
        currentQuantity={quantity}
        onConfirm={async (q) => setQuantity(q)}
        onClose={() => setShowQuantityModal(false)}
        min={VALIDATION.QUANTITY_MIN}
        max={VALIDATION.QUANTITY_MAX_ADD}
      />
    </form>
  );
}

// ============================================================================
// Icon Components (Private)
// ============================================================================

function PlusIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
