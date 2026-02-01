/**
 * Zentrale Konstanten für das Frontend.
 * Eliminiert Magic Numbers und erleichtert Wartung.
 */

// ============================================================================
// Animation Durations (in Millisekunden)
// ============================================================================

export const ANIMATION = {
  /** Dauer für Check-Animation beim Abhaken */
  CHECK_DRAW_DURATION: 800,
  /** Standard-Toast-Anzeigedauer */
  TOAST_DURATION: 1500,
  /** Fade-In Animation */
  FADE_IN: 200,
  /** Scale-In Animation */
  SCALE_IN: 150,
} as const;

// ============================================================================
// Validation Limits
// ============================================================================

export const VALIDATION = {
  /** Minimale Produktmenge */
  QUANTITY_MIN: 1,
  /** Maximale Produktmenge im Warenkorb */
  QUANTITY_MAX: 999,
  /** Maximale Produktmenge beim Hinzufügen */
  QUANTITY_MAX_ADD: 99,
  /** Maximale Länge für Produktnamen */
  NAME_MAX_LENGTH: 100,
} as const;

// ============================================================================
// Quantity Presets
// ============================================================================

export const QUANTITY_PRESETS = {
  /** Presets für das Edit-Quantity-Modal */
  EDIT_MODAL: [1, 2, 3, 5, 10, 20, 50],
  /** Presets für das AddItem-Form */
  ADD_FORM: [] as number[],
} as const;

// ============================================================================
// UI Breakpoints
// ============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;
