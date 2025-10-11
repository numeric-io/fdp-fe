import { useMemo } from 'react';
import { useContract, useContractRateRules, useEvents } from './getters';
import type { ContractRateRule, Events, SKU } from './types';

export const useEventsByContractID = (contractID: string | null): Events[] => {
  const events = useEvents();
  return useMemo(() => {
    if (contractID === null) {
      return events;
    }
    return events.filter((event) => event.contract_id === contractID);
  }, [events, contractID]);
};

export const useSKUsByContractID = (contractID: string): SKU[] => {
  const contract = useContract(contractID);
  return useMemo(() => {
    return contract?.skus ?? [];
  }, [contract]);
};

export const useSKUByID = (
  contractID: string,
  skuID: string | null,
): SKU | null => {
  const contract = useSKUsByContractID(contractID);
  return useMemo(() => {
    return contract.find((sku) => sku.id === skuID) ?? null;
  }, [contract, skuID]);
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
  const rateRules = useContractRateRulesByContractID(contractID);

  return useMemo(() => {
    if (skuID === null) {
      return rateRules;
    }
    return rateRules.filter((rule) => rule.sku.id === skuID);
  }, [rateRules, skuID]);
};
