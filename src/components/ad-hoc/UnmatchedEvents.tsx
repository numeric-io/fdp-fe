import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  name: string;
  age: number;
  email: string;
}

export const UnmatchedEvents = () => {
  const colDefs = useMemo<ColDef<RowData>[]>(
    () => [
      { field: 'name', headerName: 'Name' },
      { field: 'age', headerName: 'Age' },
      { field: 'email', headerName: 'Email', flex: 1 },
    ],
    [],
  );

  const rowData = useMemo<RowData[]>(
    () => [
      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Jim Beam', age: 35, email: 'jim.beam@example.com' },
    ],
    [],
  );

  return (
    <div className="h-full">
      <AgGridReact columnDefs={colDefs} rowData={rowData} />
    </div>
  );
};

export default UnmatchedEvents;
