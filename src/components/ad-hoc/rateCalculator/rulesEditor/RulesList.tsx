import { Button } from '@/components/ui/button'
import { useKeyOptionsByContractID } from '@/lib/store/stores/rateCalculator/memoSelectors'
import { ContractRateRule, SKU } from '@/lib/store/stores/rateCalculator/types'
import { generateShortUID } from '@/lib/utils'
import { ComparisonType, Operator, RateType } from '@numeric-io/fdp-api'
import { useState } from 'react'
import { RuleEditor } from './RuleEditor'

interface RulesListProps {
  contractID: string
  sku: string | null
  rules: ContractRateRule[]
  updateRules: (rules: ContractRateRule[]) => void
}

export const RulesList = ({ contractID, sku, rules, updateRules }: RulesListProps) => {
  const keyOptions = useKeyOptionsByContractID(contractID)
  const [expandedRuleIDs, setExpandedRuleIDs] = useState<string[]>([])
  if (!sku) {
    return null
  }
  return (
    <div className="h-full flex flex-col gap-2 overflow-auto">
      {rules.map((rule) => (
        <RuleEditor
          key={rule.id}
          rule={rule}
          isExpanded={expandedRuleIDs.includes(rule.id)}
          keyOptions={keyOptions}
          onClick={() =>
            setExpandedRuleIDs((prev) =>
              prev.includes(rule.id) ? prev.filter((id) => id !== rule.id) : [...prev, rule.id]
            )
          }
          onDeleteRule={() => updateRules(rules.filter((r) => r.id !== rule.id))}
          onUpdateRule={(rule) => updateRules(rules.map((r) => (r.id === rule.id ? rule : r)))}
        />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const maxPriority = rules.length ? Math.max(...rules.map((rule) => rule.priority)) : 0
          const newRule = createDefaultRule({
            priority: maxPriority + 1,
            sku,
            contractID,
          })
          const newRuleID = newRule.id

          updateRules([...rules, newRule])
          setExpandedRuleIDs((prev) => [...prev, newRuleID]) // Expand the new rule by default
        }}
      >
        + Add Rule
      </Button>
    </div>
  )
}

const createDefaultRule = ({
  priority,
  sku,
  contractID,
}: {
  priority: number
  sku: SKU
  contractID: string
}): ContractRateRule => {
  return {
    id: `RULE-${generateShortUID(4)}`,
    priority,
    sku,
    contract_id: contractID,
    andExpression: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.Equal,
          field: '',
          value: '',
          type: ComparisonType.String,
        },
      ],
    },
    rate: {
      t: RateType.Number,
      val: '0',
    },
  }
}
