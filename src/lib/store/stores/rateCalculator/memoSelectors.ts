import { partition } from '@/lib/utils';
import { useMemo } from 'react';
import {
  useContractRateRules,
  useContracts,
  useUnmatchedEvents,
} from './getters';
import type { Contract, ContractRateRule } from './types';

export const useContractGroupedByUnmatchedEvents = (): {
  contractsWithUnmatchedEvents: Contract[];
  contractsWithoutUnmatchedEvents: Contract[];
} => {
  const unmatchedEvents = useUnmatchedEvents();
  const contracts = useContracts();

  return useMemo(() => {
    const unmatchedEventContractIDs = new Set(
      unmatchedEvents.map((event) => event.contractID),
    );
    const [contractsWithUnmatchedEvents, contractsWithoutUnmatchedEvents] =
      partition(contracts, (contract) =>
        unmatchedEventContractIDs.has(contract.id),
      );
    return { contractsWithUnmatchedEvents, contractsWithoutUnmatchedEvents };
  }, [unmatchedEvents, contracts]);
};

export const useContractRateRulesBySKUID = (
  contractID: string,
  skuID: string | null,
): ContractRateRule[] => {
  const rateRules = useContractRateRules(contractID);

  return useMemo(() => {
    if (skuID === null) {
      return rateRules;
    }
    return rateRules.filter((rule) => rule.skuID === skuID) ?? [];
  }, [rateRules, skuID]);
};
