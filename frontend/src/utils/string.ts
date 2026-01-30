/**
 * Schneidet einen String auf maxLength und hängt ggf. "…" an.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}

/**
 * Ersten Buchstaben groß, Rest unverändert.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Deutsche Pluralform: 1 → singular, sonst plural (z.B. "Produkt" / "Produkte").
 */
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

/**
 * Trimmt und prüft auf leeren String.
 */
export function isBlank(str: string): boolean {
  return str.trim().length === 0;
}
