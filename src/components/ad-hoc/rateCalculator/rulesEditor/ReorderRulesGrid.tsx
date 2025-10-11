import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { AgGridReact } from 'ag-grid-react';
import { RuleHeaderRenderer } from './RuleEditor';
import { sortRules } from './utils';

interface ReorderRulesGridProps {
  rules: ContractRateRule[];
  setRules: React.Dispatch<React.SetStateAction<ContractRateRule[]>>;
}

export const ReorderRulesGrid = ({
  rules,
  setRules,
}: ReorderRulesGridProps) => {
  return (
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
        suppressCellFocus
        rowData={rules}
        rowDragManaged
        rowHeight={68}
        onRowDragEnd={(event) => {
          const newRuleIDToPriority: Record<string, number> = {};
          event.api.forEachNode((node, index) => {
            const rowID = node.data?.id;
            if (!rowID) return;
            newRuleIDToPriority[rowID] = index + 1;
          });

          setRules((prev) =>
            sortRules(
              prev.map((rule) => {
                const newPriority = newRuleIDToPriority[rule.id];
                if (newPriority === undefined) return rule;
                return { ...rule, priority: newPriority };
              }),
            ),
          );
        }}
      />
    </div>
  );
};
