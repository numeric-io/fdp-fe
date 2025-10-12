import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { RuleEditor } from './ruleEditor';

interface RulesListProps {
  rules: ContractRateRule[];
  setRules: React.Dispatch<React.SetStateAction<ContractRateRule[]>>;
}

export const RulesList = ({ rules, setRules }: RulesListProps) => {
  return (
    <div className="h-full flex flex-col gap-2 overflow-auto">
      {rules.map((rule) => (
        <RuleEditor key={rule.id} rule={rule} />
      ))}
    </div>
  );
};
