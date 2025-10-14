import { AppContext } from '@/App'
import { SearchField } from '@/components/ui/numeric-ui/searchField'
import { fetchEvents } from '@/lib/store/stores/api'
import { useEvents } from '@/lib/store/stores/rateCalculator/getters'
import type { Events } from '@/lib/store/stores/rateCalculator/types'
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useContext, useEffect, useMemo, useState } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

export interface EventsGridProps {
  contractID?: string
}

export const EventsGrid = ({ contractID }: EventsGridProps) => {
  const [query, setQuery] = useState('')
  // TODO: scope events to contractID later
  const events = useEvents()
  const { client } = useContext(AppContext)

  useEffect(() => {
    fetchEvents(client, { contractID })
  }, [contractID]) // eslint-disable-line react-hooks/exhaustive-deps

  const colDefs = useMemo<ColDef<Events>[]>(
    () => [
      { field: 'billing_record_eid', headerName: 'ID' },
      { field: 'contract_id', headerName: 'Contract ID' },
      { field: 'rule_id', headerName: 'Rule ID' },
      {
        field: 'content',
        headerName: 'Content',
        flex: 1,
        valueGetter: (params) => JSON.stringify(params.data?.content),
      },
      { field: 'rate', headerName: 'Rate' },
    ],
    []
  )

  return (
    <div className="h-full flex flex-col gap-2">
      <SearchField query={query} setQuery={setQuery} />
      <div className="flex-1">
        <AgGridReact columnDefs={colDefs} rowData={events} quickFilterText={query} />
      </div>
    </div>
  )
}

export default EventsGrid
