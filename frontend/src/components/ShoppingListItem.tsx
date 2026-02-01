/**
 * Einzelnes Shopping-List-Item mit Checkbox, Menge und Löschen.
 */

import { useState, useRef, useEffect } from 'react';
import { ShoppingItem } from '../types';
import { ConfirmModal } from './ConfirmModal';
import { EditQuantityModal } from './EditQuantityModal';
import { ANIMATION, VALIDATION } from '../constants';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggleBought: (id: string, bought: boolean) => Promise<void>;
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ShoppingListItem({
  item,
  onToggleBought,
  onUpdateQuantity,
  onDelete,
}: ShoppingListItemProps) {
  // State für verschiedene Operationen
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [isAnimatingCheck, setIsAnimatingCheck] = useState(false);

  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleToggle = async () => {
    const markingAsBought = !item.bought;

    if (markingAsBought) {
      // Animation abspielen, dann API aufrufen
      setIsAnimatingCheck(true);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(async () => {
        animationTimeoutRef.current = null;
        setIsUpdating(true);
        try {
          await onToggleBought(item._id, true);
        } finally {
          setIsUpdating(false);
          setIsAnimatingCheck(false);
        }
      }, ANIMATION.CHECK_DRAW_DURATION);
    } else {
      // Beim Zurücksetzen: sofort API aufrufen
      setIsUpdating(true);
      try {
        await onToggleBought(item._id, false);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleQuantityChange = async (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < VALIDATION.QUANTITY_MIN || newQuantity > VALIDATION.QUANTITY_MAX) {
      return;
    }

    setIsUpdatingQuantity(true);
    try {
      await onUpdateQuantity(item._id, newQuantity);
    } finally {
      setIsUpdatingQuantity(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(item._id);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleQuantityModalConfirm = async (quantity: number) => {
    await onUpdateQuantity(item._id, quantity);
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <>
      <li
        className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-3 py-2 transition-all duration-200 hover:bg-surface-muted/50 sm:gap-4 sm:px-4 ${
          item.bought ? 'bg-surface/50' : ''
        }`}
      >
        {/* Checkbox */}
        <CheckboxButton
          isChecked={item.bought}
          isAnimating={isAnimatingCheck}
          isUpdating={isUpdating}
          onClick={handleToggle}
        />

        {/* Name */}
        <span
          className={`min-w-0 truncate text-left text-sm transition-all duration-200 sm:text-base ${
            item.bought ? 'text-label-tertiary line-through' : 'text-label-primary'
          }`}
        >
          {item.name}
        </span>

        {/* Quantity */}
        <div className="flex w-[5.5rem] justify-center sm:w-24">
          {item.bought ? (
            <span className="rounded-md bg-surface-muted px-2.5 py-1 text-sm font-medium tabular-nums text-label-tertiary">
              {item.quantity}x
            </span>
          ) : (
            <QuantityControls
              quantity={item.quantity}
              isUpdating={isUpdatingQuantity}
              onDecrement={() => handleQuantityChange(-1)}
              onIncrement={() => handleQuantityChange(1)}
              onNumberClick={() => setShowQuantityModal(true)}
            />
          )}
        </div>

        {/* Delete Button */}
        <div className="flex w-8 justify-end">
          {!item.bought && (
            <DeleteButton onClick={() => setShowDeleteModal(true)} />
          )}
        </div>
      </li>

      {/* Modals */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Produkt entfernen"
        message={`"${item.name}" wird aus der Liste entfernt.`}
        confirmLabel="Entfernen"
        cancelLabel="Abbrechen"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      <EditQuantityModal
        isOpen={showQuantityModal}
        itemName={item.name}
        currentQuantity={item.quantity}
        onConfirm={handleQuantityModalConfirm}
        onClose={() => setShowQuantityModal(false)}
      />
    </>
  );
}

// ============================================================================
// Sub-Components (Private)
// ============================================================================

interface CheckboxButtonProps {
  isChecked: boolean;
  isAnimating: boolean;
  isUpdating: boolean;
  onClick: () => void;
}

function CheckboxButton({ isChecked, isAnimating, isUpdating, onClick }: CheckboxButtonProps) {
  const showCheck = isChecked || isAnimating;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isUpdating || isAnimating}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
        showCheck
          ? 'border-success bg-success text-white'
          : 'border-slate-200 bg-white hover:border-label-tertiary'
      } ${isUpdating ? 'opacity-50' : ''}`}
      aria-label={isChecked ? 'Als offen markieren' : 'Als erledigt markieren'}
    >
      {showCheck && (
        <svg
          className="h-3 w-3 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path
            pathLength={1}
            strokeDasharray={1}
            className={isAnimating ? 'animate-check-draw' : '[stroke-dashoffset:0]'}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}

interface QuantityControlsProps {
  quantity: number;
  isUpdating: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  onNumberClick: () => void;
}

function QuantityControls({
  quantity,
  isUpdating,
  onDecrement,
  onIncrement,
  onNumberClick,
}: QuantityControlsProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5">
      <StepperButton
        direction="decrement"
        disabled={isUpdating || quantity <= VALIDATION.QUANTITY_MIN}
        onClick={onDecrement}
      />
      <button
        type="button"
        onClick={onNumberClick}
        disabled={isUpdating}
        className={`min-w-[2rem] text-center text-sm font-medium tabular-nums transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 ${
          isUpdating ? 'text-label-tertiary' : 'text-label-primary'
        }`}
        aria-label="Menge eingeben"
      >
        {quantity}
      </button>
      <StepperButton
        direction="increment"
        disabled={isUpdating || quantity >= VALIDATION.QUANTITY_MAX}
        onClick={onIncrement}
      />
    </div>
  );
}

interface StepperButtonProps {
  direction: 'increment' | 'decrement';
  disabled: boolean;
  onClick: () => void;
}

function StepperButton({ direction, disabled, onClick }: StepperButtonProps) {
  const isIncrement = direction === 'increment';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-7 w-7 items-center justify-center rounded-md text-label-secondary transition-colors hover:bg-surface-muted hover:text-label-primary disabled:cursor-not-allowed disabled:opacity-40"
      aria-label={isIncrement ? 'Menge erhöhen' : 'Menge verringern'}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isIncrement ? 'M12 4.5v15m7.5-7.5h-15' : 'M5 12h14'}
        />
      </svg>
    </button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-label-tertiary transition-colors hover:bg-danger-light hover:text-danger"
      aria-label="Löschen"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
}
