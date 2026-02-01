/**
 * Custom Hook für Modal-Verwaltung.
 * Eliminiert duplizierte Logik für ESC-Handler und Body-Overflow.
 */

import { useEffect, useCallback, useState, RefObject } from 'react';

interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  focusRef?: RefObject<HTMLElement | null>;
}

/**
 * Hook für gemeinsame Modal-Funktionalität.
 * - Escape-Taste zum Schließen
 * - Body-Overflow deaktivieren
 * - Auto-Focus auf Element
 */
export function useModal({
  isOpen,
  onClose,
  isLoading = false,
  focusRef,
}: UseModalOptions): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) {
        onClose();
      }
    },
    [isLoading, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    // Focus auf Element setzen
    focusRef?.current?.focus();

    // Keyboard-Handler registrieren
    document.addEventListener('keydown', handleKeyDown);

    // Body-Scroll deaktivieren
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown, focusRef]);
}

/**
 * Hook für Modal-State-Management.
 */
export function useModalState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
