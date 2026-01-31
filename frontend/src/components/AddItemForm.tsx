import { useState, useRef, useEffect, FormEvent } from 'react';

interface AddItemFormProps {
  onAdd: (name: string) => Promise<void>;
  onSuccess?: (name: string) => void;
}

export function AddItemForm({ onAdd, onSuccess }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
      await onAdd(trimmedName);
      setName('');
      onSuccess?.(trimmedName);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Neues Produkt..."
        disabled={isSubmitting}
        className="input flex-1"
        autoFocus
      />
      <button
        type="submit"
        disabled={isSubmitting || !name.trim()}
        className="btn-primary w-full px-6 sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
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
    </form>
  );
}
