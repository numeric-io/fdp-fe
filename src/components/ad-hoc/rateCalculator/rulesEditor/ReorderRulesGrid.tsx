import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import { ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { RuleHeader } from './RuleHeader';
import { RULE_HEADER_HEIGHT, sortRules } from './utils';

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
            cellRenderer: (params: ICellRendererParams<ContractRateRule>) => {
              if (!params.data) return null;
              return <RuleHeader rule={params.data} />;
            },
          },
        ]}
        gridOptions={{
          suppressMoveWhenRowDragging: true,
        }}
        suppressCellFocus
        rowData={rules}
        rowDragManaged
        rowHeight={RULE_HEADER_HEIGHT}
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
