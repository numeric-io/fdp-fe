import { SearchField } from '@/components/ui/numeric-ui/searchField';
import { useEventsByContractID } from '@/lib/store/stores/rateCalculator/memoSelectors';
import type { Events } from '@/lib/store/stores/rateCalculator/types';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

export interface EventsGridProps {
  contractID: string | null;
}

export const EventsGrid = ({ contractID }: EventsGridProps) => {
  const [query, setQuery] = useState('');
  const events = useEventsByContractID(contractID);

  const colDefs = useMemo<ColDef<Events>[]>(
    () => [
      { field: 'billing_record_eid', headerName: 'ID' },
      { field: 'content', headerName: 'Content', flex: 1 },
    ],
    [],
  );

  return (
    <div className="h-full flex flex-col gap-2">
      <SearchField query={query} setQuery={setQuery} />
      <div className="flex-1">
        <AgGridReact columnDefs={colDefs} rowData={events} />
      </div>
    </div>
  );
};

export default EventsGrid;
