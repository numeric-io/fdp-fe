import { create } from 'zustand'
import { SAMPLE_CONTRACT_RATE_RULES, SAMPLE_CONTRACTS, SAMPLE_UNMATCHED_EVENTS } from './stores/rateCalculator/mockData'
import type { Store } from './types'

export const useGlobalStore = create<Store>(() => ({
  rateCalculatorStore: {
    // TODO: Remove mock data
    events: SAMPLE_UNMATCHED_EVENTS,
    contracts: SAMPLE_CONTRACTS,
    rules: SAMPLE_CONTRACT_RATE_RULES,
  },
}))
