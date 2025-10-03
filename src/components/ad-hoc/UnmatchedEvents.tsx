import { SearchField } from '@/components/ui/numeric-ui/searchField';
import { useUnmatchedEvents } from '@/lib/store/stores/rateCalculator/getters';
import type { UnmatchedEvent } from '@/lib/store/stores/rateCalculator/types';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

export const UnmatchedEvents = () => {
  const [query, setQuery] = useState('');
  const unmatchedEvents = useUnmatchedEvents();

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
