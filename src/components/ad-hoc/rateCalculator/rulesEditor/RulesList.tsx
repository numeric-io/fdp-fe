import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';

interface RulesListProps {
  rules: ContractRateRule[];
  setRules: React.Dispatch<React.SetStateAction<ContractRateRule[]>>;
}

export const RulesList = ({ rules, setRules }: RulesListProps) => {
  return <div>RulesList</div>;
};
