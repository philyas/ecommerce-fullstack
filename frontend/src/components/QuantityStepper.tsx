import { useState, useEffect } from 'react';

/**
 * Mengenwähler mit Input-Feld (Desktop: Tippen) + Stepper (−/+).
 */
interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  presets?: number[];
  size?: 'compact' | 'comfortable';
  className?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** Auf Mobil: Zahl als Button, Klick öffnet Modal statt Input */
  onMobileNumberTap?: () => void;
}

const PRESETS_DEFAULT = [2, 3, 5, 10];

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  presets = PRESETS_DEFAULT,
  size = 'comfortable',
  className = '',
  disabled = false,
  inputRef,
  onMobileNumberTap,
}: QuantityStepperProps) {
  const [inputStr, setInputStr] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputStr(String(value));
  }, [value]);

  const handleDecrement = () => onChange(Math.max(min, value - 1));
  const handleIncrement = () => onChange(Math.min(max, value + 1));

  const commitInput = (str: string) => {
    const num = parseInt(str, 10);
    if (Number.isNaN(num) || num < min) {
      onChange(min);
      setInputStr(String(min));
    } else if (num > max) {
      onChange(max);
      setInputStr(String(max));
    } else {
      onChange(num);
      setInputStr(String(num));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    if (str === '' || str === '-') {
      setInputStr(str);
      return;
    }
    const num = parseInt(str, 10);
    if (!Number.isNaN(num)) {
      setInputStr(str);
      const clamped = Math.min(max, Math.max(min, num));
      if (clamped !== value) onChange(clamped);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    commitInput(inputStr);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
    // Enter: default form submit – bewusst nicht abfangen
  };

  const isCompact = size === 'compact';
  const btnClass = isCompact
    ? 'h-9 w-9 min-w-[2.25rem] text-base'
    : 'h-11 w-11 min-w-[2.75rem] text-lg';
  const inputClass = `w-14 min-w-[2.5rem] sm:w-20 sm:min-w-[4rem] text-center font-medium text-label-primary bg-transparent border-none p-0 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isCompact ? 'text-base' : 'text-lg tabular-nums'}`;

  return (
    <div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label="Menge verringern"
          className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white font-medium text-label-primary transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface-muted active:scale-95 ${btnClass}`}
        >
          −
        </button>
        <div className={`flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white ${isCompact ? 'h-9 min-w-[3.5rem] sm:min-w-[5rem]' : 'h-11 min-w-[3.5rem] sm:min-w-[5rem]'}`}>
          {/* Mobil: tappable Button öffnet Modal */}
          {onMobileNumberTap && (
            <button
              type="button"
              onClick={onMobileNumberTap}
              disabled={disabled}
              className={`sm:hidden ${inputClass} flex h-full w-full cursor-pointer items-center justify-center`}
              aria-label="Menge eingeben"
            >
              {value}
            </button>
          )}
          {/* Desktop: Input. Mobil: nur wenn kein Modal */}
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={isFocused ? inputStr : value}
            onChange={handleInputChange}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.select();
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="Menge"
            className={`${inputClass} ${onMobileNumberTap ? 'hidden sm:block' : ''}`}
          />
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label="Menge erhöhen"
          className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white font-medium text-label-primary transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface-muted active:scale-95 ${btnClass}`}
        >
          +
        </button>
    </div>
  );
}
