import { createSelector } from '../../createSelector';
import type { Store } from '../../types';

export const getUnmatchedEvents = (store: Store) =>
  store.rateCalculatorStore.unmatchedEvents;
export const useUnmatchedEvents = createSelector(getUnmatchedEvents);

export const getContracts = (store: Store) =>
  store.rateCalculatorStore.contracts;
export const useContracts = createSelector(getContracts);

export const getContractRateRules = (store: Store, contractID: string) =>
  store.rateCalculatorStore.contracts.find(
    (contract) => contract.id === contractID,
  )?.rateRules;
export const useContractRateRules = createSelector(getContractRateRules);
