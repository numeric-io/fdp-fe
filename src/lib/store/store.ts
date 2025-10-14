import { create } from 'zustand'
import type { Store } from './types'

export const useGlobalStore = create<Store>(() => ({
  rateCalculatorStore: {
    // TODO: Remove mock data
    // events: SAMPLE_UNMATCHED_EVENTS,
    // contracts: SAMPLE_CONTRACTS,
    // rules: SAMPLE_CONTRACT_RATE_RULES,
    events: [],
    contracts: [],
    rules: [],
    editingRules: null,
  },
}))
