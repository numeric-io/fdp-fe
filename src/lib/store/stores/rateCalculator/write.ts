import { produce } from 'immer'
import { useGlobalStore } from '../../store'
import type { Store } from '../../types'
import type { Contract, ContractRateRule, EditingRules, Events } from './types'

export const writeEvents = (events: Events[]) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.events = events
    })
  })
}

export const writeContracts = (contracts: Contract[]) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.contracts = contracts
    })
  })
}

export const writeContractRateRules = (rules: ContractRateRule[]) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.rules = rules
    })
  })
}

export const writeEditingRules = (editingRules: EditingRules | null) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.editingRules = editingRules
    })
  })
}
