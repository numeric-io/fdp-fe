import { Button } from '@/components/ui/button';
import { useContractRateRulesBySKUID } from '@/lib/store/stores/rateCalculator/memoSelectors';
import type { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { type ColDef, type ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import './RateRulesGrid.css';

interface RateRulesGridContext {
  contractID: string;
}

export interface RateRulesGridProps {
  contractID: string;
  skuID: string | null;
  setSelectedSKUID: (skuID: string | null) => void;
}

export const RateRulesGrid = ({
  contractID,
  skuID,
  setSelectedSKUID,
}: RateRulesGridProps) => {
  const rateRules = useContractRateRulesBySKUID(contractID, skuID);
  // Only show SKU grouping if no SKU is selected
  const showGrouping = skuID === null;

  const colDefs = useMemo<ColDef<ContractRateRule>[]>(
    () => [
      {
        field: 'sku.id',
        headerName: 'SKU',
        rowDrag: true,
        rowGroup: showGrouping,
        hide: showGrouping,
        suppressMovable: true,
        cellRenderer: showGrouping
          ? (params: ICellRendererParams) => {
              return (
                <SKUGroupCellRenderer
                  params={params}
                  setSelectedSKUID={setSelectedSKUID}
                />
              );
            }
          : undefined,
      },
      { field: 'id', headerName: 'ID' },
      { field: 'rate', headerName: 'Rate' },
    ],
    [showGrouping, setSelectedSKUID],
  );

  const context: RateRulesGridContext = {
    contractID,
  };

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact
        theme={'legacy'}
        columnDefs={colDefs}
        rowData={rateRules}
        rowDragManaged={true}
        gridOptions={{
          suppressMoveWhenRowDragging: true,
        }}
        className="rate-rules-grid"
        defaultColDef={{
          // We don't want to sort the rows because the order of the rows
          // determines which rule takes precedence when running rate calculation
          sortable: false,
        }}
        autoGroupColumnDef={
          showGrouping
            ? {
                headerName: 'SKU',
                minWidth: 300,
                width: 300,
                headerClass: 'h-full',
                pinned: 'left',
                cellRendererParams: {
                  // Suppress default count because we are showing the count in the SKUGroupCellRenderer
                  suppressCount: true,
                },
              }
            : undefined
        }
        context={context}
        onRowDragEnd={(event) => {
          const newRuleIDs: string[] = [];
          event.api.forEachNode((node) => {
            const rowID = node.data?.id;
            if (!rowID) return;
            newRuleIDs.push(rowID);
          });

          console.log(newRuleIDs);
        }}
      />
    </div>
  );
};

interface SKUGroupCellRendererArgs {
  params: ICellRendererParams<ContractRateRule, string, RateRulesGridContext>;
  setSelectedSKUID: (skuID: string) => void;
}

const SKUGroupCellRenderer = (args: SKUGroupCellRendererArgs) => {
  const { params, setSelectedSKUID } = args;
  const SKU = params.data?.sku;
  const skuID = params.value;
  const leafCount = params.node?.allLeafChildren?.length;

  return (
    <div className="flex items-center gap-2 h-full">
      <div className="text-sm flex-1 flex gap-1 min-w-0">
        <span className="truncate">{SKU?.name}</span>
        {leafCount && <span>{`(${leafCount})`}</span>}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (!skuID) return;
          setSelectedSKUID(skuID);
        }}
      >
        Reorder rules
      </Button>
    </div>
  );
};
