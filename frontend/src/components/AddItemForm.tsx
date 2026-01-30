import { useState, FormEvent } from 'react';

interface AddItemFormProps {
  onAdd: (name: string) => Promise<void>;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setIsSubmitting(true);
    try {
      await onAdd(trimmedName);
      setName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Produkt hinzufügen…"
        disabled={isSubmitting}
        className="min-w-0 flex-1 rounded-apple border border-black/10 bg-black/[0.02] px-4 py-3.5 text-[17px] text-label-primary placeholder:text-label-tertiary focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isSubmitting || !name.trim()}
        className="shrink-0 rounded-apple bg-accent px-6 py-3.5 text-[15px] font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
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
          </span>
        ) : (
          'Hinzufügen'
        )}
      </button>
    </form>
  );
}
