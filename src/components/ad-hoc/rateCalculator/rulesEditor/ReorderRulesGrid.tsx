import { APIRule } from '@numeric-io/fdp-api'
import { ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { RuleHeader } from './RuleHeader'
import { RULE_HEADER_HEIGHT } from './utils'

interface ReorderRulesGridProps {
  rules: APIRule[]
  updateRules: (rules: APIRule[]) => void
}

export const ReorderRulesGrid = ({ rules, updateRules }: ReorderRulesGridProps) => {
  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact
        // theme={'legacy'}
        className="rules-editor-grid"
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            rowDrag: true,
            cellClass: 'rules-editor-grid-header',
            sortable: false,
            cellRenderer: (params: ICellRendererParams<APIRule>) => {
              if (!params.data) return null
              return <RuleHeader rule={params.data} />
            },
          },
        ]}
        gridOptions={{
          suppressMoveWhenRowDragging: true,
        }}
        suppressCellFocus
        rowData={rules}
        rowDragManaged
        rowHeight={RULE_HEADER_HEIGHT}
        onRowDragEnd={(event) => {
          const newRuleNameToPriority: Record<string, number> = {}
          event.api.forEachNode((node, index) => {
            const ruleName = node.data?.name
            if (!ruleName) return
            newRuleNameToPriority[ruleName] = index + 1
          })
          const newRules = rules.map((rule) => {
            const newPriority = newRuleNameToPriority[rule.name]
            if (newPriority === undefined) return rule
            return { ...rule, priority: newPriority }
          })
          updateRules(newRules)
        }}
      />
    </div>
  )
}
