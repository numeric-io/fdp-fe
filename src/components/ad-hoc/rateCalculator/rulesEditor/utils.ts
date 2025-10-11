import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';

export const sortRules = (rules: ContractRateRule[]) => {
  return rules.sort((a, b) => a.priority - b.priority);
};
