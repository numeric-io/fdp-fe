import { SearchField } from '@/components/ui/numeric-ui/searchField';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  name: string;
  age: number;
  email: string;
}

export const UnmatchedEvents = () => {
  const [query, setQuery] = useState('');

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
    <div className="h-full flex flex-col gap-2">
      <SearchField query={query} setQuery={setQuery} />
      <div className="flex-1">
        <AgGridReact columnDefs={colDefs} rowData={rowData} />
      </div>
    </div>
  );
};

export default UnmatchedEvents;
