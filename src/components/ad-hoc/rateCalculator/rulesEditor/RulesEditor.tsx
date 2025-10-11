import { Label } from '@/components/ui/numeric-ui/label';
import { useContractRateRulesBySKUID } from '@/lib/store/stores/rateCalculator/memoSelectors';
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';
import { RuleHeaderRenderer } from './RuleEditor';
import './RulesEditor.css';
import { SKUSelect } from './SKUSelector';

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
  const [editingRules, setEditingRules] = useState<ContractRateRule[]>(rules);

  // Reset editing rules when rules change
  useEffect(() => {
    setEditingRules(rules);
  }, [rules]);

  const sortedRules = useMemo(() => {
    return editingRules.sort((a, b) => a.priority - b.priority);
  }, [editingRules]);

  return (
    <div className={`h-full w-md flex flex-col gap-2`}>
      <div className="flex flex-col gap-1 flex-0">
        <Label>SKU</Label>
        <SKUSelect
          contractID={contractID}
          selectedSKUID={skuID}
          onSelectSKU={onSelectSKU}
        />
      </div>
      <div className="flex-1 ">
        <div className="ag-theme-quartz h-full">
          <AgGridReact
            theme={'legacy'}
            className="rules-editor-grid"
            columnDefs={[
              {
                field: 'id',
                headerName: 'ID',
                flex: 1,
                rowDrag: true,
                cellClass: 'rules-editor-grid-header',
                sortable: false,
                cellRenderer: RuleHeaderRenderer,
              },
            ]}
            gridOptions={{
              suppressMoveWhenRowDragging: true,
            }}
            suppressCellFocus={true}
            rowData={sortedRules}
            rowHeight={68}
            rowDragManaged
            onRowDragEnd={(event) => {
              const newRuleIDToPriority: Record<string, number> = {};
              event.api.forEachNode((node, index) => {
                const rowID = node.data?.id;
                if (!rowID) return;
                newRuleIDToPriority[rowID] = index + 1;
              });

              setEditingRules(
                editingRules.map((rule) => {
                  const newPriority = newRuleIDToPriority[rule.id];
                  if (newPriority === undefined) return rule;
                  return { ...rule, priority: newPriority };
                }),
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
