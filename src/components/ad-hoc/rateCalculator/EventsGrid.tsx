import { AppContext } from '@/App'
import { Heading } from '@/components/ui/numeric-ui/heading'
import { SearchField } from '@/components/ui/numeric-ui/searchField'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { fetchEvents } from '@/lib/store/stores/api'
import { useEditingRules, useEvents } from '@/lib/store/stores/rateCalculator/getters'
import type { Events } from '@/lib/store/stores/rateCalculator/types'
import { writeEditingRulesPeriod } from '@/lib/store/stores/rateCalculator/write'
import { SelectValue } from '@radix-ui/react-select'
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useContext, useEffect, useMemo, useState } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

const getRulePriority = (ruleID: string | undefined): number | null => {
  const match = ruleID?.match(/preview-(\d+)/)
  if (!match) return null
  return parseFloat(match[1])
}

export interface EventsGridProps {
  contractID?: string
}

const DEFAULT_PERIOD = { month: 8, year: 2025 }

export const EventsGrid = ({ contractID }: EventsGridProps) => {
  const [query, setQuery] = useState('')
  const editingRules = useEditingRules()
  const period = editingRules?.period ?? DEFAULT_PERIOD
  // const editingRules = useEditingRules()
  // TODO: scope events to contractID later
  const events = useEvents()
  const { client } = useContext(AppContext)

  const eventKeys = useMemo(
    () =>
      events.reduce<Set<string>>((acc, event) => {
        const keys = Object.keys(event.content)
        keys.forEach((key) => {
          if (!(event.content as Record<string, unknown>)[key]) return
          acc.add(key)
        })
        return acc
      }, new Set()),
    [events]
  )

  useEffect(() => {
    fetchEvents(client, { contractID, month: period.month, year: period.year })
  }, [client, contractID, period])

  const colDefs = useMemo<ColDef<Events>[]>(
    () => [
      {
        field: 'rule_id',
        headerName: 'Rule ID',
        rowGroup: true,
        hide: true,
        valueGetter: (params) => params.data?.rule_id?.replace('preview-', 'Rule-') ?? 'Unmatched',
        comparator: (valueA, valueB) => {
          console.log(valueA, valueB)
          // Unmatched events should be at the bottom
          if (valueA === 'Unmatched') return 1
          if (valueB === 'Unmatched') return -1
          // Otherwise, sort by rule ID
          const priorityA = getRulePriority(valueA)
          const priorityB = getRulePriority(valueB)
          if (priorityA === null) return 1
          if (priorityB === null) return -1
          return priorityA - priorityB
        },
      },
      { field: 'billing_record_eid', headerName: 'ID' },
      { field: 'contract_id', headerName: 'Contract ID' },
      {
        field: 'evaluated_rate',
        headerName: 'Rate',
        valueGetter: (params) =>
          params.data?.rule_id === null
            ? 'Unmatched'
            : params.data?.evaluated_rate === null
              ? 'Excluded'
              : params.data?.evaluated_rate,
      },
      ...Array.from(eventKeys).map((key) => ({
        colId: key,
        headerName: key,
        valueGetter: (params: any) => params.data?.content[key],
      })),
    ],
    [eventKeys]
  )

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heading level={3}>Events for month:</Heading>
          <MonthSelect
            selectedMonth={period?.month}
            setSelectedMonth={(month) => writeEditingRulesPeriod({ ...period, month })}
          />
          <YearSelect
            selectedYear={period?.year}
            setSelectedYear={(year) => writeEditingRulesPeriod({ ...period, year })}
          />
        </div>
        <SearchField query={query} setQuery={setQuery} />
      </div>
      <div className="flex-1">
        <AgGridReact
          columnDefs={colDefs}
          rowData={events}
          quickFilterText={query}
          autoGroupColumnDef={{
            headerName: 'Rule ID',
            sort: 'asc',
            comparator: (valueA, valueB) => {
              // Unmatched events should be at the bottom
              if (valueA === 'Unmatched') return 1
              if (valueB === 'Unmatched') return -1
              // Otherwise, sort by rule ID
              const priorityA = getRulePriority(valueA)
              const priorityB = getRulePriority(valueB)
              if (priorityA === null) return 1
              if (priorityB === null) return -1
              return priorityA - priorityB
            },
          }}
          groupDefaultExpanded={-1}
        />
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
