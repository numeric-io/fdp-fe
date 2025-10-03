import { useContractRateRules } from '@/lib/store/stores/rateCalculator/getters';
import type { ContractRateRule } from '@/lib/store/stores/rateCalculator/types';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

export interface RateRulesGridProps {
  contractID: string;
}

export const RateRulesGrid = ({ contractID }: RateRulesGridProps) => {
  const rateRules = useContractRateRules(contractID);

  const colDefs = useMemo<ColDef<ContractRateRule>[]>(
    () => [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'sku', headerName: 'SKU' },
      { field: 'currency', headerName: 'Currency' },
      { field: 'rate', headerName: 'Rate' },
    ],
    [],
  );

  return <AgGridReact columnDefs={colDefs} rowData={rateRules} />;
};
