/**
 * Bestätigungs-Modal für destruktive Aktionen.
 * Nutzt useModal Hook für einheitliche Modal-Logik.
 */

import { useRef } from 'react';
import { useModal } from '../hooks/useModal';
import { LoadingSpinner } from './LoadingSpinner';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Löschen',
  cancelLabel = 'Abbrechen',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useModal({
    isOpen,
    onClose: onCancel,
    isLoading,
    focusRef: cancelButtonRef,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-label-primary/20 backdrop-blur-sm animate-fade-in"
        onClick={!isLoading ? onCancel : undefined}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-modal animate-scale-in"
      >
        <div className="p-6">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-light">
            <DeleteIcon />
          </div>

          {/* Content */}
          <h2
            id="modal-title"
            className="text-center text-lg font-semibold text-label-primary"
          >
            {title}
          </h2>
          <p
            id="modal-description"
            className="mt-2 text-center text-sm leading-relaxed text-label-secondary"
          >
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-slate-200 bg-surface-muted/50 px-6 py-4">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="btn-secondary flex-1 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-danger px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-danger-hover active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Icon Components (Private)
// ============================================================================

function DeleteIcon() {
  return (
    <svg
      className="h-5 w-5 text-danger"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}
