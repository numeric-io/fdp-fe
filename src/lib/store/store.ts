import { create } from 'zustand';
import {
  SAMPLE_CONTRACTS,
  SAMPLE_UNMATCHED_EVENTS,
} from './stores/rateCalculator/mockData';
import type { Store } from './types';

export const useGlobalStore = create<Store>(() => ({
  rateCalculatorStore: {
    // TODO: Remove mock data
    unmatchedEvents: SAMPLE_UNMATCHED_EVENTS,
    contracts: SAMPLE_CONTRACTS,
  },
}));
