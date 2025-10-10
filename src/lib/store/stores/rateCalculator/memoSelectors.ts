import { useMemo } from 'react';
import { useContractRateRules, useEvents } from './getters';
import type { ContractRateRule, Events } from './types';

export const useEventsByContractID = (contractID: string | null): Events[] => {
  const events = useEvents();
  return useMemo(() => {
    if (contractID === null) {
      return events;
    }
    return events.filter((event) => event.contract_id === contractID);
  }, [events, contractID]);
};

export const useContractRateRulesByContractID = (
  contractID: string,
): ContractRateRule[] => {
  const rateRules = useContractRateRules();
  return useMemo(() => {
    return rateRules.filter((rule) => rule.contract_id === contractID);
  }, [rateRules, contractID]);
};

export const useContractRateRulesBySKUID = (
  contractID: string,
  skuID: string | null,
): ContractRateRule[] => {
  const rateRules = useContractRateRules();

  return useMemo(() => {
    const contractRateRules = rateRules.filter(
      (rule) => rule.contract_id === contractID,
    );
    if (skuID === null) {
      return contractRateRules;
    }
    return contractRateRules.filter((rule) => rule.sku.id === skuID);
  }, [rateRules, skuID, contractID]);
};
