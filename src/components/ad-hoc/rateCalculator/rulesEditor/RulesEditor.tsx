import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/numeric-ui/label';
import { useContractRateRulesBySKUID } from '@/lib/store/stores/rateCalculator/memoSelectors';
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { useEffect, useState } from 'react';
import { ReorderRulesGrid } from './ReorderRulesGrid';
import './RulesEditor.css';
import { RulesList } from './RulesList';
import { SKUSelect } from './SKUSelector';
import { sortRules } from './utils';

export interface RulesEditorProps {
  contractID: string;
  skuID: string | null;
  onSelectSKU: (skuID: string) => void;
}

export const RulesEditor = ({
  contractID,
  skuID,
  onSelectSKU,
}: RulesEditorProps) => {
  const rules = useContractRateRulesBySKUID(contractID, skuID);
  const [editingRules, setEditingRules] = useState<ContractRateRule[]>(
    sortRules(rules),
  );
  const [isReordering, setIsReordering] = useState(false);

  // Reset editing rules when rules change
  useEffect(() => {
    setEditingRules(sortRules(rules));
  }, [rules]);

  return (
    <div className={`h-full w-md flex flex-col gap-2 px-2`}>
      <div className="flex flex-col gap-3 flex-0">
        <div className="flex flex-col gap-1 ">
          <Label>SKU</Label>
          <SKUSelect
            contractID={contractID}
            selectedSKUID={skuID}
            onSelectSKU={onSelectSKU}
          />
        </div>
        <div className="flex justify-between ">
          <Label>{`Rules (${editingRules.length})`}</Label>
          <Button
            variant={isReordering ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsReordering((prev) => !prev)}
          >
            {isReordering ? 'Done Reordering' : 'Reorder Rules'}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {isReordering ? (
          <ReorderRulesGrid rules={editingRules} setRules={setEditingRules} />
        ) : (
          <RulesList rules={editingRules} setRules={setEditingRules} />
        )}
      </div>
    </div>
  );
};
