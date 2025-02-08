export const STORE_KEYS = {
  USERS: 'users',
  JOURNALS: 'journals',
  JOURNEYS: 'journeys'
} as const;

export type StoreKey = keyof typeof STORE_KEYS;