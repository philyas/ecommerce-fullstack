import { useState, useRef, useEffect, FormEvent } from 'react';
import { EditQuantityModal } from './EditQuantityModal';
import { QuantityStepper } from './QuantityStepper';

interface AddItemFormProps {
  onAdd: (name: string, quantity?: number) => Promise<void>;
  onSuccess?: (name: string, quantity?: number) => void;
}

export function AddItemForm({ onAdd, onSuccess }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const shouldFocusRef = useRef(false);

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
      setQuantity(1);
      onSuccess?.(trimmedName, quantity);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-3">
      {/* Produktname – Enter springt ins Mengenfeld */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            quantityInputRef.current?.focus();
          }
        }}
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
          min={1}
          max={99}
          presets={[]}
          size="comfortable"
          className="flex-1 sm:flex-initial"
          disabled={isSubmitting}
          onMobileNumberTap={() => setShowQuantityModal(true)}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !name.trim()}
        className="btn-primary order-last w-full shrink-0 px-6 sm:order-none sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={quantity > 1 ? `${quantity}x hinzufügen` : 'Hinzufügen'}
      >
        {isSubmitting ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
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
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        )}
      </button>

      <EditQuantityModal
        isOpen={showQuantityModal}
        itemName=""
        title="Menge eingeben"
        currentQuantity={quantity}
        onConfirm={async (q) => setQuantity(q)}
        onClose={() => setShowQuantityModal(false)}
        min={1}
        max={99}
      />
    </form>
  );
}
