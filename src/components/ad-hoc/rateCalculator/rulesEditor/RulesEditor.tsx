import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/numeric-ui/label'
import { useEditingRulesBySKU } from '@/lib/store/stores/rateCalculator/memoSelectors'
import { ContractRateRule } from '@/lib/store/stores/rateCalculator/types'
import { writeEditingRules } from '@/lib/store/stores/rateCalculator/write'
import { useState } from 'react'
import { ReorderRulesGrid } from './ReorderRulesGrid'
import './RulesEditor.css'
import { RulesList } from './RulesList'
import { SKUSelect } from './SKUSelector'

export interface RulesEditorProps {
  contractID: string
  sku: string | null
  onSelectSKU: (sku: string) => void
}

export const RulesEditor = ({ contractID, sku, onSelectSKU }: RulesEditorProps) => {
  const editingRules = useEditingRulesBySKU(contractID, sku)
  const [isReordering, setIsReordering] = useState(false)

  const onUpdateRules = (rules: ContractRateRule[]) => {
    if (!sku) return
    writeEditingRules({ contractID, sku, rules })
  }

  return (
    <div className={`h-full w-md flex flex-col gap-2 px-2`}>
      <div className="flex flex-col gap-3 flex-0">
        <div className="flex flex-col gap-1 ">
          <Label>SKU</Label>
          <SKUSelect
            contractID={contractID}
            selectedsku={sku}
            onSelectSKU={(newsku) => {
              // Clear editing rules
              writeEditingRules(null)
              onSelectSKU(newsku)
            }}
          />
        </div>
        {sku && (
          <div className="flex justify-between ">
            <Label>{`Rules (${editingRules.length})`}</Label>
            <Button
              variant={isReordering ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsReordering((prev) => !prev)}
            >
              {isReordering ? 'Done Reordering' : 'Reorder Rules'}
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {isReordering ? (
          <ReorderRulesGrid rules={editingRules} updateRules={onUpdateRules} />
        ) : (
          <RulesList contractID={contractID} sku={sku} rules={editingRules} updateRules={onUpdateRules} />
        )}
      </div>
    </div>
  )
}
