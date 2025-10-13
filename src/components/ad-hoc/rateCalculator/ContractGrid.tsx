import { Button } from '@/components/ui/button'
import { useContracts } from '@/lib/store/stores/rateCalculator/getters'
import type { Contract } from '@/lib/store/stores/rateCalculator/types'
import { ICellRendererParams, type ColDef } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useMemo } from 'react'

interface ContractGridContext {
  onSelectContract: (contractID: string) => void
}

export interface ContractGridProps {
  onSelectContract: (contractID: string) => void
}

export const ContractGrid = ({ onSelectContract }: ContractGridProps) => {
  const contracts = useContracts()

  const context: ContractGridContext = {
    onSelectContract,
  }

  const colDefs = useMemo<ColDef<Contract>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'customer_name',
        headerName: 'Name',
        flex: 1,
      },
      {
        colId: 'actions',
        headerName: 'Actions',
        cellRenderer: ActionsCellRenderer,
      },
    ],
    []
  )

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact
        // theme={'legacy'}
        columnDefs={colDefs}
        rowData={contracts}
        context={context}
        cellSelection={false}
        suppressCellFocus={true}
        className="contract-grid"
        onRowClicked={(event) => {
          const contractID = event.data?.id
          if (contractID) {
            onSelectContract(contractID)
          }
        }}
      />
    </div>
  )
}

const ActionsCellRenderer = (params: ICellRendererParams<Contract, unknown, ContractGridContext>) => {
  const onSelectContract = params.context?.onSelectContract

  const contractID = params.data?.id

  if (!onSelectContract || !contractID) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        onSelectContract(contractID)
      }}
    >
      View Rules
    </Button>
  )
}
