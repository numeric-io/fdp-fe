import { Button } from '@/components/ui/button'
import { LocationType } from '@/lib/routing/types'
import { useNavigateTo } from '@/lib/routing/useNavigateTo'
import { useContractRateRulesByContractID } from '@/lib/store/stores/rateCalculator/memoSelectors'
import type { ContractRateRule } from '@/lib/store/stores/rateCalculator/types'
import { type ColDef, type ICellRendererParams } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useMemo } from 'react'

interface RateRulesGridContext {
  contractID: string
}

export interface RateRulesGridProps {
  contractID: string
}

export const RateRulesGrid = ({ contractID }: RateRulesGridProps) => {
  const rateRules = useContractRateRulesByContractID(contractID)

  const colDefs = useMemo<ColDef<ContractRateRule>[]>(
    () => [
      {
        field: 'sku',
        headerName: 'SKU',
        valueGetter: (params) => `SKU: ${params.data?.sku}`,
        rowGroup: true,
        hide: true,
      },
      {
        field: 'priority',
        headerName: 'Rule',
        valueGetter: (params) => `Rule-${params.data?.priority}`,
      },
      {
        field: 'rate',
        headerName: 'Rate',
        valueGetter: (params) => (params.data?.rate === null ? 'Exclude' : params.data?.rate.val),
      },
      {
        field: 'conditions',
        headerName: 'Conditions',
        flex: 1,
        valueGetter: (params) =>
          params.data?.conditions.conditions
            .map(
              (condition) =>
                `${condition.field} ${condition.op} ${condition.op === 'nullish' ? 'is empty' : condition.value}`
            )
            .join(', '),
      },
      { colId: 'actions', headerName: '', cellRenderer: ActionsCellRenderer },
    ],
    []
  )

  const context: RateRulesGridContext = {
    contractID,
  }

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact
        // theme={'legacy'}
        columnDefs={colDefs}
        rowData={rateRules}
        className="rate-rules-grid"
        defaultColDef={{
          // We don't want to sort the rows because the order of the rows
          // determines which rule takes precedence when running rate calculation
          sortable: false,
        }}
        groupDisplayType="groupRows"
        groupDefaultExpanded={-1}
        context={context}
      />
    </div>
  )
}

const ActionsCellRenderer = (params: ICellRendererParams<ContractRateRule, string, RateRulesGridContext>) => {
  const navigateTo = useNavigateTo()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (!params.context?.contractID || !params.data?.sku) {
          console.error('No contract ID or SKU ID provided')
          return
        }
        navigateTo({
          type: LocationType.RuleEditor,
          contractID: params.context?.contractID,
          SKU: params.data?.sku,
        })
      }}
    >
      Edit
    </Button>
  )
}
