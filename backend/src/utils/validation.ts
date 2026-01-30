/**
 * Prüft, ob der Wert ein nicht-leerer String ist (nach trim).
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Prüft, ob der Wert ein Boolean ist.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Prüft, ob der String wie eine gültige MongoDB ObjectId aussieht (24 Hex-Zeichen).
 */
export function isValidMongoId(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return /^[a-fA-F0-9]{24}$/.test(value);
}

/**
 * Schneidet einen String auf maxLength und hängt ggf. "…" an.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}
