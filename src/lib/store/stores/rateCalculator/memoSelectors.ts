import { useMemo } from 'react';
import { useContractRateRules, useEvents } from './getters';
import type { ContractRateRule, Events } from './types';

export const useEventsByContractID = (contractID: string | null): Events[] => {
  const events = useEvents();
  return useMemo(() => {
    if (contractID === null) {
      return events;
    }
    return events.filter((event) => event.contractID === contractID);
  }, [events, contractID]);
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
