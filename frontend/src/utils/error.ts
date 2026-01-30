/**
 * Extrahiert eine lesbare Fehlermeldung aus unknown (Error, string, etc.).
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ein unbekannter Fehler ist aufgetreten';
}
