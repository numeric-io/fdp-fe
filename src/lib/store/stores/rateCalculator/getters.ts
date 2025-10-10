import { createSelector } from '../../createSelector';
import type { Store } from '../../types';
import type { Contract, ContractRateRule, Events } from './types';

export const getEvents = (store: Store): Events[] =>
  store.rateCalculatorStore.events;
export const useEvents = createSelector(getEvents);

export const getContracts = (store: Store): Contract[] =>
  store.rateCalculatorStore.contracts;
export const useContracts = createSelector(getContracts);

export const getContract = (
  store: Store,
  contractID: string,
): Contract | null =>
  store.rateCalculatorStore.contracts.find(
    (contract) => contract.id === contractID,
  ) ?? null;
export const useContract = createSelector(getContract);

export const getContractRateRules = (store: Store): ContractRateRule[] =>
  store.rateCalculatorStore.rules;
export const useContractRateRules = createSelector(getContractRateRules);
