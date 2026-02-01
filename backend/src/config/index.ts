/**
 * Zentralisierte Konfiguration.
 * Alle Environment-Variablen und Konstanten an einem Ort.
 */

export const config = {
  server: {
    port: Number(process.env.PORT) || 3001,
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_list',
  },
  validation: {
    item: {
      nameMinLength: 1,
      nameMaxLength: 100,
      quantityMin: 1,
      quantityMax: 999,
    },
  },
} as const;

export type Config = typeof config;
