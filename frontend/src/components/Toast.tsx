/**
 * Toast-Komponente für temporäre Benachrichtigungen.
 */

import { useEffect } from 'react';
import { ANIMATION } from '../constants';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({
  message,
  visible,
  onHide,
  duration = ANIMATION.TOAST_DURATION,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onHide]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-slide-up rounded-lg bg-success px-5 py-3 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  );
}
