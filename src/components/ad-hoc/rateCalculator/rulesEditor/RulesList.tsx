import { Button } from '@/components/ui/button';
import { useSKUByID } from '@/lib/store/stores/rateCalculator/getters';
import { ContractRateRule, SKU } from '@/lib/store/stores/rateCalculator/types';
import { generateShortUID } from '@/lib/utils';
import { useState } from 'react';
import { RuleEditor } from './RuleEditor';

interface RulesListProps {
  contractID: string;
  skuID: string | null;
  rules: ContractRateRule[];
  setRules: React.Dispatch<React.SetStateAction<ContractRateRule[]>>;
}

export const RulesList = ({
  contractID,
  skuID,
  rules,
  setRules,
}: RulesListProps) => {
  const sku = useSKUByID(contractID, skuID);
  const [expandedRuleIDs, setExpandedRuleIDs] = useState<string[]>([]);
  if (!sku) {
    return null;
  }
  return (
    <div className="h-full flex flex-col gap-2 overflow-auto">
      {rules.map((rule) => (
        <RuleEditor
          key={rule.id}
          rule={rule}
          isExpanded={expandedRuleIDs.includes(rule.id)}
          onClick={() =>
            setExpandedRuleIDs((prev) =>
              prev.includes(rule.id)
                ? prev.filter((id) => id !== rule.id)
                : [...prev, rule.id],
            )
          }
        />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setRules((prev) => {
            const maxPriority = Math.max(...prev.map((rule) => rule.priority));
            const newRule = createDefaultRule({
              priority: maxPriority + 1,
              sku,
              contractID,
            });
            const newRuleID = newRule.id;
            setExpandedRuleIDs((prev) => [...prev, newRuleID]); // Expand the new rule by default
            return [...prev, newRule];
          });
        }}
      >
        + Add Rule
      </Button>
    </div>
  );
};

const createDefaultRule = ({
  priority,
  sku,
  contractID,
}: {
  priority: number;
  sku: SKU;
  contractID: string;
}): ContractRateRule => {
  return {
    id: `RULE-${generateShortUID(4)}`,
    priority,
    sku,
    contract_id: contractID,
    rule: {},
    rate: '0',
  };
};
