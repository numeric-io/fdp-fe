import { create } from 'zustand';
import type { Store } from './types';

export const useGlobalStore = create<Store>(() => ({
  rateCalculatorStore: {
    unmatchedEvents: [],
  },
}));
