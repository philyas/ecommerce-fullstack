import { useEffect, useRef } from 'react';

interface CongratsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CongratsModal({ isOpen, onClose }: CongratsModalProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    buttonRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-label-primary/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="congrats-title"
        aria-describedby="congrats-description"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-modal animate-scale-in"
      >
        <div className="p-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
            <svg
              className="h-8 w-8 text-success"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2
            id="congrats-title"
            className="text-center text-xl font-bold text-label-primary"
          >
            Geschafft!
          </h2>
          <p className="text-center text-sm text-label-secondary">
            Fast zumindest.
          </p>
          <p
            id="congrats-description"
            className="mt-3 text-center text-base font-medium text-label-primary"
          >
          Jetzt heißt es: Focus!
          </p>
          <p className="mt-2 text-center text-sm leading-relaxed text-label-secondary">
            Immer drauf lauern und in Stellung gehen, wenn eine neue Kasse aufmacht.
          </p>
        </div>

        <div className="border-t border-slate-200 bg-surface-muted/50 px-6 py-4">
          <button
            ref={buttonRef}
            type="button"
            onClick={onClose}
            className="btn-primary w-full"
          >
            Zur Kasse!
          </button>
        </div>
      </div>
    </div>
  );
}
