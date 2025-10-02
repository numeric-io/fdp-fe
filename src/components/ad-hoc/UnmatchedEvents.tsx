import { SearchField } from '@/components/ui/numeric-ui/searchField';
import { updateUnmatchedEvents } from '@/lib/store/stores/rateCalculator/actions';
import { useUnmatchedEvents } from '@/lib/store/stores/rateCalculator/getters';
import type { UnmatchedEvent } from '@/lib/store/stores/rateCalculator/types';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

export const UnmatchedEvents = () => {
  const [query, setQuery] = useState('');
  const unmatchedEvents = useUnmatchedEvents();

  useEffect(() => {
    updateUnmatchedEvents([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Jim Beam' },
    ]);
  }, []);

  const colDefs = useMemo<ColDef<UnmatchedEvent>[]>(
    () => [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name', flex: 1 },
    ],
    [],
  );

  return (
    <div className="h-full flex flex-col gap-2">
      <SearchField query={query} setQuery={setQuery} />
      <div className="flex-1">
        <AgGridReact columnDefs={colDefs} rowData={unmatchedEvents} />
      </div>
    </div>
  );
};

export default UnmatchedEvents;
