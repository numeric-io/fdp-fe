import { produce } from 'immer'
import { useGlobalStore } from '../../store'
import type { Store } from '../../types'
import type { Contract, Events } from './types'

export const writeEvents = (events: Events[]) => {
  useGlobalStore.setState((store: Store) => {
    return produce(store, (draft) => {
      draft.rateCalculatorStore.events = events
    })
  })
}

export const writeContracts = (contracts: Contract[]) => {
  console.log('writeContracts called with:', contracts)
  useGlobalStore.setState((store: Store) => {
    console.log('Current store state before update:', store.rateCalculatorStore.contracts)
    return produce(store, (draft) => {
      draft.rateCalculatorStore.contracts = contracts
    })
  })
  console.log('Store state after update:', useGlobalStore.getState().rateCalculatorStore.contracts)
}
