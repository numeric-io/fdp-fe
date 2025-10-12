import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';

export const RULE_HEADER_HEIGHT = 68;

export const sortRules = (rules: ContractRateRule[]) => {
  return rules.sort((a, b) => a.priority - b.priority);
};
