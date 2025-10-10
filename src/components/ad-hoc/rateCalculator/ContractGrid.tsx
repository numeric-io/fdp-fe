import { useContracts } from '@/lib/store/stores/rateCalculator/getters';
import type { Contract } from '@/lib/store/stores/rateCalculator/types';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { type ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

export interface ContractGridProps {
  onSelectContract: (contractID: string) => void;
}

export const ContractGrid = ({ onSelectContract }: ContractGridProps) => {
  const rateRules = useContracts();

  const colDefs = useMemo<ColDef<Contract>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
      },
    ],
    [],
  );

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact
        theme={'legacy'}
        columnDefs={colDefs}
        rowData={rateRules}
        className="contract-grid"
        onRowClicked={(event) => {
          const contractID = event.data?.id;
          if (contractID) {
            onSelectContract(contractID);
          }
        }}
      />
    </div>
  );
};
