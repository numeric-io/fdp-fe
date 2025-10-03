import { useContractRateRulesBySKUID } from '@/lib/store/stores/rateCalculator/memoSelectors';
import type { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  RowDragModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  ValidationModule,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  RowDragModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
]);

export interface RateRulesGridProps {
  contractID: string;
  skuID: string | null;
}

export const RateRulesGrid = ({ contractID, skuID }: RateRulesGridProps) => {
  const rateRules = useContractRateRulesBySKUID(contractID, skuID);
  // Only show SKU grouping if no SKU is selected
  const showGrouping = skuID === null;

  const colDefs = useMemo<ColDef<ContractRateRule>[]>(
    () => [
      {
        field: 'skuID',
        headerName: 'SKU',
        rowDrag: true,
        rowGroup: showGrouping,
        hide: showGrouping,
      },
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'currency', headerName: 'Currency' },
      { field: 'rate', headerName: 'Rate' },
    ],
    [showGrouping],
  );

  return (
    <AgGridReact
      columnDefs={colDefs}
      rowData={rateRules}
      rowDragManaged={true}
      gridOptions={{
        suppressMoveWhenRowDragging: true,
      }}
      defaultColDef={{
        // We don't want to sort the rows because the order of the rows
        // determines which rule takes precedence when running rate calculation
        sortable: false,
      }}
      autoGroupColumnDef={
        showGrouping
          ? {
              headerName: 'SKU',
            }
          : undefined
      }
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
  );
};
