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

export const writeClearingRules = () => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      if (!draft.rateCalculatorStore.editingRules) return
      draft.rateCalculatorStore.editingRules.rules = null
    })
  })
}

export const writeEditingRules = (editingRules: EditingRules['rules']) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      if (!draft.rateCalculatorStore.editingRules) return
      draft.rateCalculatorStore.editingRules.rules = editingRules
    })
  })
}

export const writeEditingRulesPeriod = (period: { month: number; year: number }) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      if (!draft.rateCalculatorStore.editingRules) return
      draft.rateCalculatorStore.editingRules.period = period
    })
  })
}

export const writeEditingRulesContractID = (
  contractID: string,
  sku: string,
  period: { month: number; year: number }
) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.editingRules = {
        contractID,
        sku,
        period,
        rules: null,
      }
    })
  })
}

export const writeEditingRulesNull = () => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.editingRules = null
    })
  })
}
