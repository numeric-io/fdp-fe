import { AppContext } from '@/App'
import { Heading } from '@/components/ui/numeric-ui/heading'
import { SearchField } from '@/components/ui/numeric-ui/searchField'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { fetchEvents } from '@/lib/store/stores/api'
import { useEvents } from '@/lib/store/stores/rateCalculator/getters'
import type { Events } from '@/lib/store/stores/rateCalculator/types'
import { SelectValue } from '@radix-ui/react-select'
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useContext, useEffect, useMemo, useState } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

export interface EventsGridProps {
  contractID?: string
}

export const EventsGrid = ({ contractID }: EventsGridProps) => {
  const [query, setQuery] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(8)
  const [selectedYear, setSelectedYear] = useState(2025)
  // TODO: scope events to contractID later
  const events = useEvents()
  const { client } = useContext(AppContext)

  useEffect(() => {
    fetchEvents(client, { contractID, month: selectedMonth, year: selectedYear })
  }, [client, contractID, selectedMonth, selectedYear])

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heading level={3}>Events for month:</Heading>
          <MonthSelect selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        </div>
        <SearchField query={query} setQuery={setQuery} />
      </div>
      <div className="flex-1">
        <AgGridReact columnDefs={colDefs} rowData={events} quickFilterText={query} />
      </div>
    </div>
  )
}

export default EventsGrid

interface MonthSelectProps {
  selectedMonth: number
  setSelectedMonth: (month: number) => void
}

const MonthSelect = ({ selectedMonth, setSelectedMonth }: MonthSelectProps) => {
  return (
    <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(Number(value))}>
      <SelectTrigger>
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">January</SelectItem>
        <SelectItem value="2">February</SelectItem>
        <SelectItem value="3">March</SelectItem>
        <SelectItem value="4">April</SelectItem>
        <SelectItem value="5">May</SelectItem>
        <SelectItem value="6">June</SelectItem>
        <SelectItem value="7">July</SelectItem>
        <SelectItem value="8">August</SelectItem>
        <SelectItem value="9">September</SelectItem>
        <SelectItem value="10">October</SelectItem>
        <SelectItem value="11">November</SelectItem>
        <SelectItem value="12">December</SelectItem>
      </SelectContent>
    </Select>
  )
}

interface YearSelectProps {
  selectedYear: number
  setSelectedYear: (year: number) => void
}

const YearSelect = ({ selectedYear, setSelectedYear }: YearSelectProps) => {
  return (
    <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2025">2025</SelectItem>
        <SelectItem value="2024">2024</SelectItem>
        <SelectItem value="2023">2023</SelectItem>
        <SelectItem value="2022">2022</SelectItem>
        <SelectItem value="2021">2021</SelectItem>
        <SelectItem value="2020">2020</SelectItem>
      </SelectContent>
    </Select>
  )
}
