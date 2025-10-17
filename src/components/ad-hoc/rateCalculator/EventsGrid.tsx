import { AppContext } from '@/App'
import { Heading } from '@/components/ui/numeric-ui/heading'
import { SearchField } from '@/components/ui/numeric-ui/searchField'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { LocationType } from '@/lib/routing/types'
import { useCurrentLocation } from '@/lib/routing/useCurrentLocation'
import { fetchEvents } from '@/lib/store/stores/api'
import { useEditingRules, useEvents } from '@/lib/store/stores/rateCalculator/getters'
import { useRuleNameToPriority } from '@/lib/store/stores/rateCalculator/memoSelectors'
import type { Events } from '@/lib/store/stores/rateCalculator/types'
import { writeEditingRulesPeriod } from '@/lib/store/stores/rateCalculator/write'
import { SelectValue } from '@radix-ui/react-select'
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useContext, useEffect, useMemo, useState } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

const UNMATCHED_RULE_NAME = 'Unmatched'

const HIGH_PRIORITY_KEYS = ['Salesforce_SKU', 'AGREEMENT_CHANNEL', 'BILLABLE_EVENT_TYPE']

export interface EventsGridProps {
  contractID?: string
}

const DEFAULT_PERIOD = { month: 8, year: 2025 }

export const EventsGrid = ({ contractID }: EventsGridProps) => {
  const [query, setQuery] = useState('')
  const location = useCurrentLocation()
  const editingRules = useEditingRules()
  const ruleNameToPriority = useRuleNameToPriority(contractID ?? null, editingRules?.sku ?? null)
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
    // Skip fetching events if we are in the rule editor because it will run rules instead
    if (location.type === LocationType.RuleEditor) return
    fetchEvents(client, { contractID, month: period.month, year: period.year })
  }, [client, contractID, location.type, period])

  const colDefs = useMemo<ColDef<Events>[]>(
    () => [
      {
        field: 'matched_rule.name',
        headerName: 'Rule Name',
        rowGroup: true,
        hide: true,
        valueGetter: (params) => params.data?.matched_rule?.name ?? UNMATCHED_RULE_NAME,
      },
      ...HIGH_PRIORITY_KEYS.map((key) => ({
        field: `content.${key}` as any,
        headerName: key,
        valueGetter: (params: any) => (params.data?.content as any)?.[key],
      })),
      {
        field: 'matched_rule.evaluated_rate',
        headerName: 'Evaluated Rate',
        type: 'numericColumn',
        valueGetter: (params) => {
          if (!params.data) return ''
          if (params.data.matched_rule === null) return 'Unmatched'
          if (params.data.matched_rule.evaluated_rate === null) return 'Excluded'
          return params.data.matched_rule.evaluated_rate
        },
      },
      ...Array.from(eventKeys)
        .filter((key) => !HIGH_PRIORITY_KEYS.includes(key))
        .map((key) => ({
          colId: key,
          headerName: key,
          valueGetter: (params: any) => params.data?.content[key],
        }))
        .sort((a, b) => a.headerName.localeCompare(b.headerName)),
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
          groupDisplayType="singleColumn"
          autoGroupColumnDef={{
            headerName: 'Matched Rule',
            pinned: 'left',
            sortable: false,
            sort: 'asc',
            comparator: (ruleNameA, ruleNameB) => {
              // Unmatched rules should be at the bottom
              if (ruleNameA === UNMATCHED_RULE_NAME) return 1
              if (ruleNameB === UNMATCHED_RULE_NAME) return -1
              const priorityA = ruleNameToPriority[ruleNameA]
              const priorityB = ruleNameToPriority[ruleNameB]

              return (priorityA ?? 0) - (priorityB ?? 0)
            },
          }}
          alwaysMultiSort
          onRowDataUpdated={({ api }) => {
            api.forEachNode((node) => {
              if (!node.group) return
              // Expand the unmatched rule when data is updated
              node.setExpanded(node.key === UNMATCHED_RULE_NAME)
            })
          }}
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
